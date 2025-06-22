require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Server } = require("socket.io");
const http = require("http");
const axios = require("axios");

const upload = multer({ dest: "uploads/" });

const app = express(); // Changed from appConfig to app
const server = http.createServer(app);
const allowedOrigins = [
  "https://dating-mwt3.vercel.app",
  "https://dating-s3zh.vercel.app",
  /^https:\/\/dating-s3zh-.*\.vercel\.app$/,
  "http://localhost:3000",
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((allowedOrigin) =>
        typeof allowedOrigin === "string" ? allowedOrigin === origin : allowedOrigin.test(origin)
      );
      if (isAllowed) {
        callback(null, true);
      } else {
        console.error("CORS Error: Origin not allowed", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json()); // Now correctly uses app
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
});
const User = mongoose.model("User", UserSchema);

// Profile Schema
const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nickname: { type: String, required: true },
  avatar: { type: String },
  yourGender: {
    type: String,
    required: true,
    enum: ["male", "woman"],
    lowercase: true,
  },
  introExtro: { type: String, required: true },
  secretObsession: { type: String, required: true },
  conversationStarter: { type: String },
  decisionMaking: { type: String },
  kitchenSkill: { type: String },
  weekdayNight: { type: String },
  weekendVibe: { type: String },
  dealbreaker: { type: String, required: true },
  firstDateEnergy: { type: String },
  argueStyle: { type: String, required: true },
  idealDate: { type: String, required: true },
  uselessTalent: { type: String, required: true },
  apocalypseRole: { type: String },
  deepestFear: { type: String, required: true },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.length >= 4 && v.length <= 7,
      message: "You must upload between 4 and 7 images!",
    },
  },
  age: { type: Number, required: true, min: 18 },
  genderPreference: {
    type: String,
    enum: ["male", "women", "both"],
    required: true,
    lowercase: true,
  },
  favoriteMovie: { type: String, required: true },
  favoriteMusic: { type: String, required: true },
  profileCompleted: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
});
const Profile = mongoose.model("Profile", ProfileSchema);

// ChatPartner Schema
const ChatPartnerSchema = new mongoose.Schema({
  userId1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userId2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});
const ChatPartner = mongoose.model("ChatPartner", ChatPartnerSchema);

// Conversation Schema
const ConversationSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      messageType: {
        type: String,
        enum: ["text", "emoji", "gif"],
        default: "text",
      },
      reactions: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          emoji: { type: String },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
ConversationSchema.index({ participants: 1 });
const Conversation = mongoose.model("Conversation", ConversationSchema);

// JWT Functions
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Middleware to Verify Token for Socket.IO
const verifyTokenSocket = (socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) {
    console.log("No cookie header present");
    return next(new Error("Unauthorized"));
  }

  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    console.log("No token extracted from cookie");
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    next(new Error("Invalid token"));
  }
};

// Middleware to Ensure Profile Completion
io.use(async (socket, next) => {
  try {
    await verifyTokenSocket(socket, async (err) => {
      if (err) return next(err);
      const profile = await Profile.findOne({ userId: socket.userId });
      if (!profile || !profile.profileCompleted) {
        console.log("User", socket.userId, "has incomplete profile");
        return next(new Error("Profile incomplete. Please complete your profile to chat."));
      }
      const { genderPreference } = socket.handshake.query;
      if (genderPreference && !["men", "women", "both"].includes(genderPreference.toLowerCase())) {
        console.log("Invalid genderPreference for user", socket.userId, ":", genderPreference);
        return next(new Error("Invalid gender preference"));
      }
      next();
    });
  } catch (error) {
    console.error("Error checking profile:", error);
    next(new Error("Server error"));
  }
});

// Chat and Video Logic with Socket.IO
let waitingUsers = [];
const sessionTimeouts = new Map();
const continueResponses = new Map();

io.on("connection", async (socket) => {
  console.log("User connected with ID:", socket.userId, "Origin:", socket.handshake.headers.origin);

  const userData = { socket, userId: socket.userId };

  const getSessionIdFromRooms = () => {
    const rooms = Array.from(socket.rooms);
    return rooms.find((room) => room !== socket.id) || null;
  };

  const leaveCurrentSession = () => {
    const sessionId = getSessionIdFromRooms();
    if (sessionId) {
      socket.leave(sessionId);
      io.to(sessionId).emit("partner_left", { message: "Stranger disconnected" });
      console.log("User", socket.userId, "left session:", sessionId);
      if (sessionTimeouts.has(sessionId)) {
        clearTimeout(sessionTimeouts.get(sessionId));
        sessionTimeouts.delete(sessionId);
      }
      continueResponses.delete(sessionId);
    }
  };

  const startSessionTimer = (sessionId) => {
    if (sessionTimeouts.has(sessionId)) {
      clearTimeout(sessionTimeouts.get(sessionId));
    }
    const timeout = setTimeout(() => {
      console.log("Session", sessionId, "prompting for continuation");
      io.to(sessionId).emit("session_timeout_prompt", {
        message: "2 minutes are up! Do you want to continue chatting?",
      });
      const responseTimeout = setTimeout(() => {
        console.log("No response or disagreement for session", sessionId);
        io.to(sessionId).emit("session_timeout", { message: "Session ended due to timeout or disagreement" });
        io.in(sessionId).allSockets().then((clients) => {
          clients.forEach((clientId) => {
            const clientSocket = io.sockets.sockets.get(clientId);
            if (clientSocket) {
              clientSocket.leave(sessionId);
              clientSocket.emit("waiting", { message: "Looking for a compatible stranger..." });
              waitingUsers.push({ socket: clientSocket, userId: clientSocket.userId });
              console.log("User", clientSocket.userId, "re-queued after timeout");
            }
          });
        });
        sessionTimeouts.delete(sessionId);
        continueResponses.delete(sessionId);
      }, 30000);
      sessionTimeouts.set(sessionId, responseTimeout);
    }, 120000);
    sessionTimeouts.set(sessionId, timeout);
  };

  const areUsersCompatible = async (user1Id, user2Id, user1Socket, user2Socket) => {
    try {
      const user1Profile = await Profile.findOne({ userId: user1Id });
      const user2Profile = await Profile.findOne({ userId: user2Id });

      if (!user1Profile || !user2Profile) {
        console.log(`Profile missing for user ${user1Id} or ${user2Id}`);
        return false;
      }

      const user1Gender = user1Profile.yourGender.toLowerCase();
      const user1Preference = (user1Socket.handshake.query.genderPreference || user1Profile.genderPreference).toLowerCase();
      const user2Gender = user2Profile.yourGender.toLowerCase();
      const user2Preference = (user2Socket.handshake.query.genderPreference || user2Profile.genderPreference).toLowerCase();

      const genderMap = {
        man: "men",
        woman: "women",
        male: "men",
        female: "women",
      };
      const normalizedUser1Gender = genderMap[user1Gender] || user1Gender;
      const normalizedUser2Gender = genderMap[user2Gender] || user2Gender;

      console.log(
        `Checking compatibility: User1 (ID: ${user1Id}, Gender: ${user1Gender}, Pref: ${user1Preference}), ` +
        `User2 (ID: ${user2Id}, Gender: ${user2Gender}, Pref: ${user2Preference})`
      );
      console.log(`Normalized: User1 Gender: ${normalizedUser1Gender}, User2 Gender: ${normalizedUser2Gender}`);

      const user1Matches = user1Preference === "both" || user1Preference === normalizedUser2Gender;
      const user2Matches = user2Preference === "both" || user2Preference === normalizedUser1Gender;

      console.log(`User1 matches: ${user1Matches}, User2 matches: ${user2Matches}`);

      return user1Matches && user2Matches;
    } catch (error) {
      console.error("Error checking compatibility:", error);
      return false;
    }
  };

  const pairUser = async (userData) => {
    const { socket, userId } = userData;
    leaveCurrentSession();
  
    waitingUsers = waitingUsers.filter((u) => u.userId !== userId);
  
    let match = null;
    for (let i = 0; i < waitingUsers.length; i++) {
      const potentialMatch = waitingUsers[i];
      if (potentialMatch.userId !== userId) {
        const isCompatible = await areUsersCompatible(userId, potentialMatch.userId, socket, potentialMatch.socket);
        if (isCompatible) {
          match = potentialMatch;
          waitingUsers.splice(i, 1);
          break;
        }
      }
    }
  
    if (match) {
      const sessionId = `${userId}-${match.userId}-${Date.now()}`;
      match.socket.leave(getSessionIdFromRooms.call(match.socket));
      socket.join(sessionId);
      match.socket.join(sessionId);
  
      // Determine offerer and answerer based on userId comparison
      const isOfferer = userId < match.userId; // Smaller userId is the offerer
      socket.emit("paired", {
        message: "Connected with a stranger!",
        sessionId,
        role: isOfferer ? "offerer" : "answerer",
      });
      match.socket.emit("paired", {
        message: "Connected with a stranger!",
        sessionId,
        role: isOfferer ? "answerer" : "offerer",
      });
      console.log("Paired users in session:", sessionId, "Offerer:", isOfferer ? userId : match.userId);
      startSessionTimer(sessionId);
    } else {
      waitingUsers.push(userData);
      socket.emit("waiting", { message: "Waiting for a compatible stranger..." });
      console.log("User", userId, "added to queue. Queue length:", waitingUsers.length);
    }
  };

  socket.on("continue_response", async ({ sessionId, continueChat }) => {
    if (sessionId !== getSessionIdFromRooms()) {
      console.warn("Invalid sessionId for continue response from user", socket.userId);
      return;
    }

    if (!continueResponses.has(sessionId)) {
      continueResponses.set(sessionId, new Map());
    }

    continueResponses.get(sessionId).set(socket.userId, continueChat);

    console.log(`User ${socket.userId} responded ${continueChat} for session ${sessionId}`);

    const responses = continueResponses.get(sessionId);
    if (responses.size === 2) {
      const userIds = Array.from(responses.keys());
      const bothContinue = Array.from(responses.values()).every((res) => res === true);

      if (bothContinue) {
        console.log("Both users agreed to continue for session", sessionId);
        const [userId1, userId2] = userIds;
        await ChatPartner.findOneAndUpdate(
          { $or: [{ userId1, userId2 }, { userId1: userId2, userId2: userId1 }] },
          { userId1, userId2, createdAt: Date.now() },
          { upsert: true }
        );

        io.in(sessionId).allSockets().then((clients) => {
          clients.forEach(async (clientId) => {
            const clientSocket = io.sockets.sockets.get(clientId);
            if (clientSocket) {
              clientSocket.leave(sessionId);
              const partnerId = userIds.find((id) => id !== clientSocket.userId);
              const partner = await User.findById(partnerId);
              const partnerProfile = await Profile.findOne({ userId: partnerId });
              clientSocket.emit("continue_chat", {
                message: "Both agreed to continue! Redirecting to messaging...",
                partnerUserId: partnerId,
                partnerName: partnerProfile?.nickname || partner?.name || "Stranger",
                partnerAvatar: partnerProfile?.avatar || null,
              });
            }
          });
        });
        if (sessionTimeouts.has(sessionId)) {
          clearTimeout(sessionTimeouts.get(sessionId));
          sessionTimeouts.delete(sessionId);
        }
        continueResponses.delete(sessionId);
      } else {
        console.log("One or both users declined to continue for session", sessionId);
        io.to(sessionId).emit("session_timeout", { message: "One or both users chose not to continue" });
        io.in(sessionId).allSockets().then((clients) => {
          clients.forEach((clientId) => {
            const clientSocket = io.sockets.sockets.get(clientId);
            if (clientSocket) {
              clientSocket.leave(sessionId);
              clientSocket.emit("waiting", { message: "Looking for a compatible stranger..." });
              waitingUsers.push({ socket: clientSocket, userId: clientSocket.userId });
              console.log("User", clientSocket.userId, "re-queued after decline");
            }
          });
        });
        if (sessionTimeouts.has(sessionId)) {
          clearTimeout(sessionTimeouts.get(sessionId));
          sessionTimeouts.delete(sessionId);
        }
        continueResponses.delete(sessionId);
      }
    }
  });

  socket.on("message", async (data) => {
    const { text, toUserId, messageType = "text" } = data;
    if (!toUserId || !text) {
      console.error("Invalid message data from user", socket.userId);
      return;
    }

    try {
      const participants = [socket.userId, toUserId].sort();
      const messageData = {
        senderId: socket.userId,
        message: text,
        messageType,
        createdAt: new Date(),
      };

      let conversation = await Conversation.findOne({
        participants: { $all: participants },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants,
          messages: [messageData],
        });
      } else {
        conversation.messages.push(messageData);
        conversation.updatedAt = new Date();
      }

      await conversation.save();
      console.log(`Message saved: ${text} (type: ${messageType}) from ${socket.userId} to ${toUserId}`);

      const recipientSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === toUserId
      );
      if (recipientSocket) {
        recipientSocket.emit("message", { text, from: socket.userId, messageType });
        console.log(`Message sent from ${socket.userId} to ${toUserId}: ${text} (type: ${messageType})`);
      } else {
        console.log(`Recipient ${toUserId} not connected`);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("react", async (data) => {
    const { messageId, emoji, toUserId } = data;
    if (!messageId || !emoji || !toUserId) {
      console.error("Invalid reaction data from user", socket.userId);
      return;
    }

    try {
      const participants = [socket.userId, toUserId].sort();
      const conversation = await Conversation.findOne({
        participants: { $all: participants },
      });

      if (!conversation) {
        console.error("Conversation not found for reaction");
        return;
      }

      const message = conversation.messages.id(messageId);
      if (!message) {
        console.error("Message not found for reaction");
        return;
      }

      const existingReaction = message.reactions.find(
        (r) => r.userId.toString() === socket.userId
      );
      if (existingReaction) {
        existingReaction.emoji = emoji;
      } else {
        message.reactions.push({ userId: socket.userId, emoji });
      }

      await conversation.save();
      console.log(`Reaction ${emoji} added by ${socket.userId} to message ${messageId}`);

      const recipientSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === toUserId
      );
      if (recipientSocket) {
        recipientSocket.emit("reaction", { messageId, emoji, from: socket.userId });
        console.log(`Reaction sent to ${toUserId}: ${emoji} on message ${messageId}`);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  });

  socket.on("typing", ({ toUserId }) => {
    if (!toUserId) {
      console.error("Invalid typing data from user", socket.userId);
      return;
    }
    const recipientSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === toUserId
    );
    if (recipientSocket) {
      recipientSocket.emit("typing", { from: socket.userId });
      console.log(`Typing event sent from ${socket.userId} to ${toUserId}`);
    }
  });

  socket.on("stop_typing", ({ toUserId }) => {
    if (!toUserId) {
      console.error("Invalid stop typing data from user", socket.userId);
      return;
    }
    const recipientSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === toUserId
    );
    if (recipientSocket) {
      recipientSocket.emit("stop_typing", { from: socket.userId });
      console.log(`Stop typing event sent from ${socket.userId} to ${toUserId}`);
    }
  });

  socket.on("offer", (data) => {
    const { offer, sessionId } = data;
    if (!sessionId || !socket.rooms.has(sessionId)) {
      console.error("Invalid sessionId for offer from user", socket.userId);
      return;
    }
    socket.to(sessionId).emit("offer", { offer, from: socket.userId, sessionId });
    console.log("Offer emitted to session", sessionId);
  });

  socket.on("answer", (data) => {
    const { answer, sessionId } = data;
    if (!sessionId || !socket.rooms.has(sessionId)) {
      console.error("Invalid sessionId for answer from user", socket.userId);
      return;
    }
    socket.to(sessionId).emit("answer", { answer, from: socket.userId, sessionId });
    console.log("Answer emitted to session", sessionId);
  });

  socket.on("ice-candidate", (data) => {
    const { candidate, sessionId } = data;
    if (!sessionId || !socket.rooms.has(sessionId)) {
      console.error("Invalid sessionId for ICE candidate from user", socket.userId);
      return;
    }
    if (candidate) {
      socket.to(sessionId).emit("ice-candidate", { candidate, from: socket.userId, sessionId });
      console.log("ICE candidate emitted to session", sessionId);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnecting with ID:", socket.userId);
    waitingUsers = waitingUsers.filter((u) => u.userId !== socket.userId);
    leaveCurrentSession();
    console.log("Updated queue length after disconnect:", waitingUsers.length);
  });

  socket.on("next", async () => {
    console.log("User", socket.userId, "requested next chat");
    leaveCurrentSession();
    waitingUsers = waitingUsers.filter((u) => u.userId !== socket.userId);
    waitingUsers.push(userData);
    socket.emit("waiting", { message: "Looking for a compatible stranger..." });
    console.log("User", socket.userId, "re-queued. Queue length:", waitingUsers.length);
    setTimeout(async () => {
      await pairUser(userData);
    }, 1500);
  });

  await pairUser(userData);
});

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({ name, email, password: hashedPassword });
  await user.save();

  generateToken(user, res);
  res.json({ message: "User registered successfully", user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  generateToken(user, res);
  res.json({ message: "Login successful", user });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();
      }
      return done(null, user);
    }
  )
);
app.use(passport.initialize());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    generateToken(req.user, res);
    const redirectUrl = process.env.NODE_ENV === "production"
      ? "https://dating-mwt3.vercel.app/dashboard"
      : "http://localhost:3000/dashboard";
    res.redirect(redirectUrl);
  }
);

app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    const profile = await Profile.findOne({ userId: decoded.id });

    res.json({
      ...user.toObject(),
      avatar: profile ? profile.avatar : null,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/user/profile", upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "images", maxCount: 7 }
]), async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    let avatarUrl = null;
    if (req.files.avatar) {
      const avatarFile = req.files.avatar[0];
      const result = await cloudinary.uploader.upload(avatarFile.path);
      avatarUrl = result.secure_url;
    }

    const imageUrls = req.files.images
      ? await Promise.all(
          req.files.images.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
          })
        )
      : null;

    let profile = await Profile.findOne({ userId });
    const profileData = {
      ...req.body,
      images: imageUrls || (profile ? profile.images : []),
      avatar: avatarUrl || (profile ? profile.avatar : null),
      profileCompleted: true,
      lastUpdated: Date.now(),
    };

    if (profile) {
      profile = await Profile.findOneAndUpdate({ userId }, profileData, { new: true });
    } else {
      profile = new Profile({ userId, ...profileData });
      await profile.save();
    }

    res.json({ message: "Profile saved successfully", profileCompleted: true, profile });
  } catch (error) {
    console.error("Profile save error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/user/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const profile = await Profile.findOne({ userId: decoded.id });
    res.json(profile || { profileCompleted: false });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/user/add-chat-partner", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const { partnerId } = req.body;

    await ChatPartner.findOneAndUpdate(
      { $or: [{ userId1: userId, userId2: partnerId }, { userId1: partnerId, userId2: userId }] },
      { userId1: userId, userId2: partnerId, createdAt: Date.now() },
      { upsert: true }
    );

    res.status(200).json({ message: "Chat partner added successfully" });
  } catch (error) {
    console.error("Error adding chat partner:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/user/chat-partners", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const chatPartners = await ChatPartner.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    }).populate("userId1 userId2");

    const partnersWithDetails = await Promise.all(
      chatPartners.map(async (partner) => {
        const partnerUser = partner.userId1._id.toString() === userId ? partner.userId2 : partner.userId1;
        const partnerProfile = await Profile.findOne({ userId: partnerUser._id });
        return {
          userId: partnerUser._id.toString(),
          partnerName: partnerProfile?.nickname || partnerUser.name || "Stranger",
          partnerAvatar: partnerProfile?.avatar || null,
          createdAt: partner.createdAt,
        };
      })
    );

    res.json(partnersWithDetails);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/user/chat-messages/:partnerId", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const partnerId = req.params.partnerId;

    const participants = [userId, partnerId].sort();
    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    }).populate("messages.senderId", "name");

    if (!conversation) {
      return res.json([]);
    }

    const formattedMessages = conversation.messages.map((msg) => ({
      _id: msg._id,
      from: msg.senderId._id.toString() === userId ? "me" : "stranger",
      text: msg.message,
      messageType: msg.messageType,
      reactions: msg.reactions.map((r) => ({
        userId: r.userId.toString(),
        emoji: r.emoji,
      })),
      createdAt: msg.createdAt,
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GIF Search Route
app.get("/gifs/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: query,
        limit: 10,
        rating: "pg-13",
      },
    });

    const gifs = response.data.data.map((gif) => ({
      id: gif.id,
      url: gif.images.fixed_height.url,
      title: gif.title,
    }));

    res.json(gifs);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));