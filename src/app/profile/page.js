"use client"
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Edit3, 
  Camera, 
  Heart, 
  Star, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Check,
  X,
  Lightbulb,
  Globe,
  User
} from "lucide-react";
import FaceVerification from "./FaceVerification";

const ProfileQuestionnaire = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [insights, setInsights] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingAnswers, setEditingAnswers] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTargetSection, setEditTargetSection] = useState(null);
  const [editTargetQuestion, setEditTargetQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSectionSequentialEdit, setIsSectionSequentialEdit] = useState(false);

  const COLORS = {
    primary: "#FF6B6B",
    secondary: "#4ECDC4", 
    accent1: "#FFE66D",
    accent2: "#1A535C",
    accent3: "#F4A261",
    dark: "#2B2D42",
    light: "#F7FFF7",
    success: "#06D6A0",
    warning: "#F18701",
    error: "#D00000"
  };

  const sections = [
    {
      title: "THE BASICS",
      emoji: "📌",
      description: "Let's start with who you are",
      icon: "📝",
      questions: [
        {
          id: "nickname",
          question: "WHAT'S YOUR NICKNAME?",
          type: "text",
          placeholder: "What your crew calls you",
          required: true,
          hints: ["Biscuit - my dog named me", "Chaos - self-explanatory", "MJ - initials, not Jordan"],
        },
        {
          id: "age",
          question: "HOW OLD ARE YOU?",
          type: "number",
          placeholder: "18 or older",
          required: true,
          min: 18,
        },
        {
          id: "agePreference",
          question: "WHAT AGE RANGE DO YOU PREFER?",
          type: "ageRange",
          required: true,
        },
        {
          id: "genderPreference",
          question: "WHO DO YOU WANNA DATE?",
          type: "singleChoice",
          options: [
            { value: "male", label: "MEN", emoji: "👨" },
            { value: "woman", label: "WOMEN", emoji: "👩" },
            { value: "both", label: "BOTH", emoji: "✨" },
          ],
          required: true,
        },
        {
          id: "yourGender",
          question: "WHAT IS YOUR GENDER?",
          type: "singleChoice",
          options: [
            { value: "male", label: "GUYS WHO CAN LIFT STUFF", emoji: "👨" },
            { value: "woman", label: "GALS WHO STEAL YOUR FRIES", emoji: "👩" },
          ],
          required: true,
        },
        {
          id: "slogan",
          question: "YOUR SLOGAN",
          type: "text",
          placeholder: "Your vibe in a line",
          required: true,
          hints: ["Living my best chaotic life", "Professional overthinker", "Pizza enthusiast & dog whisperer"]
        },
        {
          id: "countryState",
          question: "WHERE DO YOU LIVE?",
          type: "countryState",
          required: true,
          placeholder: { country: "Country", state: "State/Province" }
        },
        {
          id: "about",
          question: "WRITE ABOUT YOURSELF",
          type: "textarea",
          placeholder: "Tell us your story... What makes you laugh? What drives you? What's your ideal Sunday?",
          required: true,
          minLength: 50,
          hints: [
            "Talk about your passions and what makes you unique",
            "Share your sense of humor or what you're looking for",
            "Mention your hobbies, dreams, or random fun facts about yourself"
          ]
        },
        {
          id: "bioImage",
          question: "BIO IMAGE (just one)",
          type: "file",
          required: true,
          multiple: false,
          accept: "image/*",
          max: 1,
        },
        {
          id: "personalityTraits",
          question: "YOUR PERSONALITY TRAITS",
          subtitle: "Pick the ones that vibe with you (choose 3-6)",
          type: "multiSelectGrid",
          options: [
            { value: "funny", label: "Funny", emoji: "😂", description: "Life's better with laughter" },
            { value: "adventurous", label: "Adventurous", emoji: "🌍", description: "Always up for new experiences" },
            { value: "creative", label: "Creative", emoji: "🎨", description: "Artistic soul with big ideas" },
            { value: "kind", label: "Kind", emoji: "💖", description: "Empathy is my superpower" },
            { value: "ambitious", label: "Ambitious", emoji: "🚀", description: "Dream big, work hard" },
            { value: "chill", label: "Chill", emoji: "😎", description: "Go with the flow energy" },
            { value: "thoughtful", label: "Thoughtful", emoji: "🤔", description: "Deep conversations welcome" },
            { value: "spontaneous", label: "Spontaneous", emoji: "⚡", description: "Let's make random memories" },
            { value: "loyal", label: "Loyal", emoji: "🦁", description: "Ride or die friendship" },
            { value: "curious", label: "Curious", emoji: "🔍", description: "Always learning something new" },
          ],
          required: true,
          min: 3,
          max: 6
        },
        {
          id: "interests",
          question: "YOUR INTERESTS",
          subtitle: "What gets you excited? (choose 5-10)",
          type: "multiSelectGrid",
          options: [
            { value: "travel", label: "Travel", emoji: "✈️", description: "Collecting passport stamps" },
            { value: "music", label: "Music", emoji: "🎵", description: "Soundtrack to my life" },
            { value: "photography", label: "Photography", emoji: "📸", description: "Capturing perfect moments" },
            { value: "reading", label: "Reading", emoji: "📚", description: "Books are my escape" },
            { value: "gaming", label: "Gaming", emoji: "🎮", description: "Digital adventures await" },
            { value: "fitness", label: "Fitness", emoji: "🏋️", description: "Strong body, strong mind" },
            { value: "cooking", label: "Cooking", emoji: "🍳", description: "Kitchen experiments daily" },
            { value: "art", label: "Art", emoji: "🎨", description: "Creating beautiful things" },
            { value: "technology", label: "Technology", emoji: "💻", description: "Future is now" },
            { value: "coffee", label: "Coffee", emoji: "☕", description: "Caffeine-powered human" },
            { value: "dancing", label: "Dancing", emoji: "💃", description: "Rhythm in my soul" },
            { value: "hiking", label: "Hiking", emoji: "🥾", description: "Nature is my therapy" },
            { value: "yoga", label: "Yoga", emoji: "🧘", description: "Mind-body connection" },
            { value: "movies", label: "Movies", emoji: "🎬", description: "Cinema enthusiast" },
            { value: "pets", label: "Pets", emoji: "🐶", description: "Animal lover forever" },
            { value: "fashion", label: "Fashion", emoji: "👗", description: "Style is self-expression" },
            { value: "sports", label: "Sports", emoji: "🏀", description: "Competition brings out my best" },
            { value: "writing", label: "Writing", emoji: "✍️", description: "Words are my medium" },
            { value: "meditation", label: "Meditation", emoji: "🧘‍♂️", description: "Inner peace journey" },
            { value: "volunteering", label: "Volunteering", emoji: "🤝", description: "Giving back feels good" },
          ],
          required: true,
          min: 5,
          max: 10
        },
        {
          id: "avatar",
          question: "YOUR PROFILE AVATAR",
          subtitle: "Your best face-forward photo",
          type: "file",
          required: true,
          multiple: false,
          accept: "image/*",
          max: 1,
        },
        {
          id: "images",
          question: "DROP YOUR PICS HERE",
          subtitle: "Show your personality through photos (4-7 images)",
          type: "file",
          required: true,
          multiple: true,
          accept: "image/*",
          min: 4,
          max: 7,
        },
      ],
    },
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/user/profile', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const profile = await response.json();
          console.log("Fetched profile from backend:", profile);
          
          if (profile.profileCompleted) {
            // Reconstruct objects from separate fields
            const reconstructedProfile = {
              ...profile,
              // Reconstruct countryState object from separate country/state fields
              countryState: profile.country && profile.state ? {
                country: profile.country,
                state: profile.state
              } : undefined,
              // agePreference is already an object, but ensure it's properly structured
              agePreference: profile.agePreference || undefined
            };
            
            console.log("Reconstructed profile:", reconstructedProfile);
            console.log("Country/State data:", {
              country: profile.country,
              state: profile.state,
              countryState: reconstructedProfile.countryState
            });
            console.log("Age preference data:", {
              agePreference: profile.agePreference,
              reconstructed: reconstructedProfile.agePreference
            });
            
            setProfileData(reconstructedProfile);
            setAnswers(reconstructedProfile);
            setAvatarPreview(profile.avatar);
            setImagesPreview(profile.images || []);
            setCompleted(true);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (isEditMode) setShowEditModal(true);
    else setShowEditModal(false);
  }, [isEditMode]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: [COLORS.primary, COLORS.secondary, COLORS.accent1],
    });
  };

  const handleAnswerChange = (questionId, value) => {
    console.log(`handleAnswerChange called for ${questionId}:`, value);
    
    // Special logging for agePreference and countryState
    if (questionId === 'agePreference') {
      console.log('Age preference updated:', value);
    }
    if (questionId === 'countryState') {
      console.log('Country/State updated:', value);
    }
    
    setAnswers({ ...answers, [questionId]: value });
    if (questionId === "avatar" && value) {
      setAvatarPreview(URL.createObjectURL(value));
    } else if (questionId === "images" && value) {
      setImagesPreview(value.map(file => URL.createObjectURL(file)));
    }
  };

  const handleEditAnswerChange = (questionId, value) => {
    setEditingAnswers({ ...editingAnswers, [questionId]: value });
    if (questionId === "avatar" && value) {
      setAvatarPreview(URL.createObjectURL(value));
    } else if (questionId === "images" && value) {
      setImagesPreview(value.map(file => URL.createObjectURL(file)));
    }
  };

  const startEditing = (sectionIndex, questionId = null) => {
    if (questionId) {
      // Single-question edit mode (ADD)
      setIsEditMode(true);
      setEditTargetSection(sectionIndex);
      const section = sections[sectionIndex];
      const questionIndex = section.questions.findIndex(q => q.id === questionId);
      setEditTargetQuestion(questionIndex);
      setCurrentSection(sectionIndex);
      setCurrentQuestion(questionIndex);
      setCompleted(false);
    } else {
      // Sequential section flow (COMPLETE)
      setCurrentSection(sectionIndex);
      // Find first incomplete question in section
      const incompleteQuestions = getIncompleteQuestions(sectionIndex);
      const section = sections[sectionIndex];
      const firstIncompleteIndex = section.questions.findIndex(q => q.id === (incompleteQuestions[0]?.id));
      setCurrentQuestion(firstIncompleteIndex >= 0 ? firstIncompleteIndex : 0);
      setIsEditMode(false);
      setEditTargetSection(null);
      setEditTargetQuestion(null);
      setCompleted(false);
      setIsSectionSequentialEdit(true);
    }
  };

  const cancelEditing = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setEditTargetSection(null);
      setEditTargetQuestion(null);
      setCompleted(true);
    } else {
      setEditingSection(null);
      setEditingAnswers({});
    }
    setAvatarPreview(profileData?.avatar);
    setImagesPreview(profileData?.images || []);
  };

  const saveEditing = async (sectionIndex) => {
    setLoading(true);
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      console.log("Saving editing answers:", editingAnswers);
      
      // Add all editing answers
      Object.keys(editingAnswers).forEach(key => {
        const value = editingAnswers[key];
        if (value instanceof File) {
          // Handle single file
          formData.append(key, value);
        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
          // Handle multiple files
          value.forEach(file => {
            formData.append(key, file);
          });
        } else if (typeof value === 'object' && value !== null) {
          // Handle objects like ageRange, countryState
          const jsonValue = JSON.stringify(value);
          console.log(`Adding ${key}:`, jsonValue);
          formData.append(key, jsonValue);
          
          // Special handling for countryState - also send separate fields for compatibility
          if (key === 'countryState' && value.country && value.state) {
            console.log(`Also adding separate country: ${value.country}, state: ${value.state}`);
            formData.append('country', value.country);
            formData.append('state', value.state);
          }
          
          // Special handling for agePreference - also send separate fields for compatibility
          if (key === 'agePreference' && value.min && value.max) {
            console.log(`Also adding separate min: ${value.min}, max: ${value.max}`);
            formData.append('min', value.min);
            formData.append('max', value.max);
          }
        } else if (Array.isArray(value)) {
          // Handle arrays like personalityTraits, interests
          formData.append(key, JSON.stringify(value));
        } else {
          // Handle primitive values
          formData.append(key, value);
        }
      });

      console.log("FormData contents for editing:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send to backend
      const response = await fetch('/user/profile', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();
      console.log("Backend response for editing:", result);
      
      setProfileData({
        ...profileData,
        ...editingAnswers,
        ...result.profile,
        profileCompleted: true,
      });
      setAnswers({ ...answers, ...editingAnswers });
      setEditingSection(null);
      setEditingAnswers({});
      triggerConfetti();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalSave = () => {
    // Save the answer for the current question only
    setAnswers({ ...answers });
    setIsEditMode(false);
    setEditTargetSection(null);
    setEditTargetQuestion(null);
    setCompleted(true);
    setShowEditModal(false);
    triggerConfetti();
  };

  const handleModalCancel = () => {
    setIsEditMode(false);
    setEditTargetSection(null);
    setEditTargetQuestion(null);
    setShowEditModal(false);
  };

  const currentSectionData = sections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];

  const isAnswerValid = (questionData, answer) => {
    if (questionData.required) {
      if (
        answer === null ||
        answer === undefined ||
        (typeof answer === "string" && answer.trim() === "") ||
        (Array.isArray(answer) && answer.length === 0)
      ) {
        return false;
      }
    }
    
    if (questionData.type === "multiSelectGrid" && answer) {
      if (questionData.min && answer.length < questionData.min) return false;
      if (questionData.max && answer.length > questionData.max) return false;
    }
    
    if (questionData.type === "textarea" && questionData.minLength && answer) {
      if (answer.length < questionData.minLength) return false;
    }
    
    // Handle countryState validation
    if (questionData.type === "countryState" && answer) {
      if (!answer.country || !answer.state) return false;
    }
    
    // Handle ageRange/agePreference validation
    if (questionData.type === "ageRange" && answer) {
      if (!answer.min || !answer.max || parseInt(answer.min) >= parseInt(answer.max)) return false;
    }
    
    // Also check agePreference field from backend for ageRange questions
    if (questionData.type === "ageRange" && !answer && profileData?.agePreference) {
      const agePref = profileData.agePreference;
      if (!agePref.min || !agePref.max || parseInt(agePref.min) >= parseInt(agePref.max)) return false;
    }
    
    // Also check separate country/state fields from backend for countryState questions
    if (questionData.type === "countryState" && !answer && (profileData?.country || profileData?.state)) {
      if (!profileData.country || !profileData.state) return false;
    }
    
    return true;
  };

  const nextQuestion = () => {
    const currentAnswer = answers[currentQuestionData.id] || profileData?.[currentQuestionData.id];
    
    if (!isAnswerValid(currentQuestionData, currentAnswer)) return;

    if (isEditMode && editTargetSection !== null && editTargetQuestion !== null) {
      // If we're in edit mode, save and return to profile
      setAnswers({ ...answers });
      setIsEditMode(false);
      setEditTargetSection(null);
      setEditTargetQuestion(null);
      setCompleted(true);
      triggerConfetti();
      return;
    }

    // If we're in the BASICS section and this is the last question, submit and go to profile view
    if (currentSection === 0 && currentQuestion === sections[0].questions.length - 1) {
      submitAnswers();
      return;
    }
    
    // Move to next question
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHints(false);
    } else {
      // End of section
      setIsSectionSequentialEdit(false);
      setCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHints(false);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
      setShowHints(false);
    }
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      // Ensure all questions are present in answers
      const allAnswers = { ...answers };
      sections.forEach(section => {
        section.questions.forEach(q => {
          if (!(q.id in allAnswers)) {
            allAnswers[q.id] = null; // or "" for text fields if you prefer
          }
        });
      });

      const formData = new FormData();
      Object.keys(allAnswers).forEach(key => {
        const value = allAnswers[key];
        // ... existing logic for appending to formData ...
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
          value.forEach(file => {
            formData.append(key, file);
          });
        } else if (typeof value === 'object' && value !== null) {
          const jsonValue = JSON.stringify(value);
          formData.append(key, jsonValue);
          if (key === 'countryState' && value.country && value.state) {
            formData.append('country', value.country);
            formData.append('state', value.state);
          }
          if (key === 'agePreference' && value.min && value.max) {
            formData.append('min', value.min);
            formData.append('max', value.max);
          }
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        } else {
          formData.append(key, "");
        }
      });

      // ... rest of submitAnswers logic ...

      // Send to backend
      const response = await fetch('/user/profile', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();
      console.log("Backend response:", result);
      
      setCompleted(true);
      setProfileData({
        ...result.profile,
        profileCompleted: true,
      });
      setAnswers({ ...result.profile });
      
      // Create preview URLs for files
      if (answers.avatar && typeof answers.avatar === 'object') {
        setAvatarPreview(URL.createObjectURL(answers.avatar));
      }
      if (answers.images && Array.isArray(answers.images)) {
        setImagesPreview(answers.images.map(file => URL.createObjectURL(file)));
      }
      
      triggerConfetti();
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCountryStateInput = () => {
    // Handle both formats: countryState object or separate country/state fields
    let currentValue = answers[currentQuestionData.id] || profileData?.[currentQuestionData.id] || {};
    
    // If we have separate country/state fields from backend, construct the object
    if (!currentValue.country && !currentValue.state && profileData) {
      currentValue = {
        country: profileData.country || "",
        state: profileData.state || ""
      };
    }
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={20} />
          <input
            type="text"
            className="w-full pl-12 pr-5 py-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
            placeholder={currentQuestionData.placeholder?.country || "Country"}
            value={currentValue.country || ""}
            onChange={(e) => handleAnswerChange(currentQuestionData.id, { 
              ...currentValue, 
              country: e.target.value 
            })}
            style={{ transform: "rotate(-0.5deg)" }}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={20} />
          <input
            type="text"
            className="w-full pl-12 pr-5 py-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
            placeholder={currentQuestionData.placeholder?.state || "State/Province"}
            value={currentValue.state || ""}
            onChange={(e) => handleAnswerChange(currentQuestionData.id, { 
              ...currentValue, 
              state: e.target.value 
            })}
            style={{ transform: "rotate(0.5deg)" }}
          />
        </div>
      </motion.div>
    );
  };

  const renderTextareaInput = () => {
    const currentValue = answers[currentQuestionData.id] || profileData?.[currentQuestionData.id] || "";
    const charCount = currentValue.length;
    const minLength = currentQuestionData.minLength || 0;
    const isValid = charCount >= minLength;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative space-y-2"
      >
        <div className="relative">
          <User className="absolute left-4 top-4 text-gray-500 z-10" size={20} />
          <textarea
            className={`w-full pl-12 pr-5 py-5 text-lg bg-white border-4 ${
              charCount > 0 && !isValid ? 'border-red-500' : 'border-black'
            } shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-200 resize-none`}
            placeholder={currentQuestionData.placeholder || ""}
            value={currentValue}
            onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
            rows={6}
            style={{ transform: "rotate(-0.5deg)" }}
          />
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className={`font-bold ${isValid ? 'text-green-600' : 'text-red-500'}`}>
            {charCount}/{minLength} characters {isValid ? '✓' : `(${minLength - charCount} more needed)`}
          </span>
          
          {currentQuestionData.hints && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 px-3 py-1 border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-bold"
              style={{ transform: "rotate(2deg)" }}
            >
              <Lightbulb size={14} />
              HINTS
            </motion.button>
          )}
        </div>
        
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 p-4 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
              style={{ transform: "rotate(0.5deg)" }}
            >
              <p className="mb-2 font-black text-sm">💡 INSPIRATION:</p>
              <ul className="space-y-1 text-sm">
                {currentQuestionData.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderMultiSelectGrid = () => {
    const currentValues = answers[currentQuestionData.id] || profileData?.[currentQuestionData.id] || [];
    const min = currentQuestionData.min || 1;
    const max = currentQuestionData.max || currentQuestionData.options.length;
    const isValid = currentValues.length >= min && currentValues.length <= max;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {currentQuestionData.subtitle && (
          <p className="text-base font-bold text-gray-700 mb-4">
            {currentQuestionData.subtitle}
          </p>
        )}
        
        <div className="mb-4 text-sm font-bold">
          <span className={`${isValid ? 'text-green-600' : 'text-red-500'}`}>
            Selected: {currentValues.length}/{max} 
            {currentValues.length < min && ` (${min - currentValues.length} more needed)`}
            {currentValues.length >= min && ' ✓'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestionData.options.map((option, index) => {
            const isSelected = currentValues.includes(option.value);
            const canSelect = !isSelected && currentValues.length < max;
            const canDeselect = isSelected;
            const isDisabled = !canSelect && !canDeselect;
            
            return (
              <motion.button
                key={option.value}
                whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                className={`relative flex flex-col items-center p-4 text-center transition-all border-4 font-bold rounded-lg ${
                  isSelected 
                    ? "border-black bg-black text-white shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] translate-y-[-2px]" 
                    : isDisabled
                    ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                }`}
                onClick={() => {
                  if (isDisabled) return;
                  
                  const newValues = isSelected
                    ? currentValues.filter((v) => v !== option.value)
                    : [...currentValues, option.value];
                  handleAnswerChange(currentQuestionData.id, newValues);
                }}
                disabled={isDisabled}
                style={{
                  transform: `rotate(${(index % 3 - 1) * 0.5}deg)`,
                }}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="text-sm font-black uppercase mb-1">{option.label}</div>
                {option.description && (
                  <div className={`text-xs ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>
                    {option.description}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestionData) return null;
    
    switch (currentQuestionData.type) {
      case "countryState":
        return renderCountryStateInput();
        
      case "textarea":
        return renderTextareaInput();
        
      case "multiSelectGrid":
        return renderMultiSelectGrid();
        
      case "text":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <input
              type="text"
              className="w-full p-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
              placeholder={currentQuestionData.placeholder || ""}
              value={answers[currentQuestionData.id] || profileData?.[currentQuestionData.id] || ""}
              onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
              style={{ transform: "rotate(-0.5deg)" }}
            />
            {currentQuestionData.hints && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  onClick={() => setShowHints(!showHints)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 border-2 border-black bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <Lightbulb size={16} />
                </motion.button>
                <AnimatePresence>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
                      style={{ transform: "rotate(0.5deg)" }}
                    >
                      <p className="mb-2 font-black text-sm">💡 TRY SOMETHING LIKE:</p>
                      <ul className="space-y-1 text-sm">
                        {currentQuestionData.hints.map((hint, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span>{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        );
        
      case "number":
        return (
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            type="number"
            className="w-full p-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
            placeholder={currentQuestionData.placeholder || ""}
            value={answers[currentQuestionData.id] || profileData?.[currentQuestionData.id] || ""}
            min={currentQuestionData.min}
            onChange={(e) => {
              const value = e.target.value;
              if (!currentQuestionData.min || value >= currentQuestionData.min) {
                handleAnswerChange(currentQuestionData.id, value);
              }
            }}
            style={{ transform: "rotate(-0.5deg)" }}
          />
        );
        
      case "ageRange":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 items-center"
          >
            <input
              type="number"
              min={18}
              max={99}
              className="w-1/2 p-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
              placeholder="Min Age"
              value={answers[currentQuestionData.id]?.min || profileData?.[currentQuestionData.id]?.min || profileData?.agePreference?.min || ""}
              onChange={e => handleAnswerChange(currentQuestionData.id, { 
                ...answers[currentQuestionData.id], 
                min: e.target.value 
              })}
              style={{ transform: "rotate(-1deg)" }}
            />
            <span className="font-bold text-xl">to</span>
            <input
              type="number"
              min={18}
              max={99}
              className="w-1/2 p-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
              placeholder="Max Age"
              value={answers[currentQuestionData.id]?.max || profileData?.[currentQuestionData.id]?.max || profileData?.agePreference?.max || ""}
              onChange={e => handleAnswerChange(currentQuestionData.id, { 
                ...answers[currentQuestionData.id], 
                max: e.target.value 
              })}
              style={{ transform: "rotate(1deg)" }}
            />
          </motion.div>
        );
        
      case "singleChoice":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 w-full"
          >
            {currentQuestionData.options.map((option, index) => {
              const isSelected = (answers[currentQuestionData.id] || profileData?.[currentQuestionData.id]) === option.value;
              const rotations = ["-1deg", "1deg", "-0.5deg", "0.5deg", "0deg"];
              const bgColors = [COLORS.primary, COLORS.secondary, COLORS.accent1, COLORS.accent3, COLORS.light];
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-5 text-left transition-all border-4 border-black font-bold rounded-lg ${
                    isSelected ? "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-y-[-4px]" : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                  onClick={() => handleAnswerChange(currentQuestionData.id, option.value)}
                  style={{
                    transform: `rotate(${rotations[index % rotations.length]})`,
                    backgroundColor: isSelected ? "#000000" : bgColors[index % bgColors.length],
                    color: isSelected ? "#ffffff" : "#000000",
                  }}
                >
                  {option.emoji && <span className="text-2xl mr-3">{option.emoji}</span>}
                  <span className="text-lg">{option.label}</span>
                  {isSelected && <Check className="ml-auto" size={20} />}
                </motion.button>
              );
            })}
          </motion.div>
        );
        
      case "file":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative space-y-4"
          >
            {currentQuestionData.subtitle && (
              <p className="text-base font-bold text-gray-700">
                {currentQuestionData.subtitle}
              </p>
            )}
            
            <div className="relative">
              <Camera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={20} />
              <input
                type="file"
                multiple={currentQuestionData.multiple}
                accept={currentQuestionData.accept}
                className="w-full pl-12 pr-5 py-5 text-lg bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-bold hover:scale-[1.02] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (currentQuestionData.multiple) {
                    if (files.length < currentQuestionData.min || files.length > currentQuestionData.max) {
                      alert(`Please upload between ${currentQuestionData.min} and ${currentQuestionData.max} images!`);
                      return;
                    }
                  } else if (files.length > currentQuestionData.max) {
                    alert("Please upload only one avatar image!");
                    return;
                  }
                  handleAnswerChange(currentQuestionData.id, currentQuestionData.multiple ? files : files[0]);
                }}
                style={{ transform: "rotate(-0.5deg)" }}
              />
            </div>
            
            <p className="text-sm font-bold text-gray-600">
              Uploaded: {currentQuestionData.multiple ? (answers[currentQuestionData.id]?.length || 0) : answers[currentQuestionData.id] ? 1 : 0}/{currentQuestionData.max}
            </p>
            
            {/* Avatar Preview */}
            {currentQuestionData.id === "avatar" && (avatarPreview || profileData?.avatar) && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p className="text-sm font-bold mb-2">Avatar Preview:</p>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={avatarPreview || profileData.avatar}
                    alt="Avatar preview"
                    className="w-32 h-32 object-cover border-4 border-black rounded-full cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => setLightboxImage(avatarPreview || profileData.avatar)}
                    style={{ transform: "rotate(2deg)" }}
                  />
                </motion.div>
                <FaceVerification
                  avatarUrl={avatarPreview || profileData.avatar}
                  onVerified={() => {
                    setAnswers((prev) => ({ ...prev, verified: true }));
                  }}
                />
                {answers.verified && (
                  <div className="text-green-600 font-bold mt-2">Face Verified!</div>
                )}
              </>
            )}
            
            {/* Images Preview */}
            {currentQuestionData.id === "images" && (imagesPreview.length > 0 || profileData?.images) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <p className="text-sm font-bold mb-2">Images Preview:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(imagesPreview.length > 0 ? imagesPreview : profileData?.images || []).map((url, index) => (
                    <motion.img
                      key={index}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      src={url}
                      alt={`Image preview ${index + 1}`}
                      className="w-full h-20 object-cover border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                      onClick={() => setLightboxImage(url)}
                      style={{ transform: `rotate(${(index % 3 - 1) * 2}deg)` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  const getIncompleteQuestions = (sectionIndex) => {
    const section = sections[sectionIndex];
    return section.questions.filter(question => {
      let answer = profileData?.[question.id];
      
      // Handle special cases for backend field names
      if (question.type === "countryState" && !answer) {
        // Check if we have separate country/state fields from backend
        if (profileData?.country || profileData?.state) {
          answer = { country: profileData.country, state: profileData.state };
        }
      } else if (question.type === "ageRange" && !answer) {
        // Check if we have agePreference field from backend
        if (profileData?.agePreference) {
          answer = profileData.agePreference;
        }
      }
      
      return !isAnswerValid(question, answer);
    });
  };

  const renderProfileView = () => {
    if (!profileData) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2
              className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4"
              style={{ 
                color: COLORS.dark, 
                textShadow: `4px 4px 0 ${COLORS.primary}`,
                transform: "rotate(-1deg)"
              }}
            >
              YOUR PROFILE
            </h2>
            <div className="w-32 h-2 bg-black mx-auto" style={{ transform: "rotate(1deg)" }}></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Avatar and Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Avatar Card */}
              <div
                className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                style={{ transform: "rotate(-1deg)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2" style={{ color: COLORS.accent2 }}>
                    <User size={24} />
                    AVATAR
                  </h3>
                </div>
                {profileData.avatar && (
                  <motion.img
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    src={profileData.avatar}
                    alt="Profile avatar"
                    className="w-40 h-40 object-cover border-4 border-black rounded-full cursor-pointer mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => setLightboxImage(profileData.avatar)}
                    style={{ transform: "rotate(1deg)" }}
                  />
                )}
              </div>

              {/* Images Card */}
              <div
                className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                style={{ transform: "rotate(1deg)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2" style={{ color: COLORS.accent2 }}>
                    <Camera size={24} />
                    GALLERY
                  </h3>
                </div>
                {profileData.images && (
                  <div className="grid grid-cols-2 gap-3">
                    {profileData.images.map((url, index) => (
                      <motion.img
                        key={index}
                        whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                        src={url}
                        alt={`Profile pic ${index + 1}`}
                        className="w-full h-24 object-cover border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        onClick={() => setLightboxImage(url)}
                        style={{ transform: `rotate(${(index % 3 - 1) * 1}deg)` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Profile Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              {sections.map((section, sectionIndex) => {
                const incompleteQuestions = getIncompleteQuestions(sectionIndex);
                const isComplete = incompleteQuestions.length === 0;
                
                return (
                  <div
                    key={sectionIndex}
                    className={`bg-white border-4 ${isComplete ? 'border-black' : 'border-orange-400'} shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden`}
                    style={{ 
                      transform: `rotate(${(sectionIndex % 2 === 0 ? 0.5 : -0.5)}deg)`,
                      backgroundColor: isComplete ? COLORS.light : '#FFF7ED'
                    }}
                  >
                    {/* Section Header */}
                    <div className="flex justify-between items-center p-6 border-b-4 border-black">
                      <button
                        onClick={() => setActiveSection(activeSection === sectionIndex ? null : sectionIndex)}
                        className="text-left flex-1 flex items-center gap-3"
                      >
                        <span className="text-3xl">{section.icon}</span>
                        <div>
                          <h3 className="text-2xl font-black uppercase" style={{ color: COLORS.dark }}>
                            {section.title}
                          </h3>
                          {!isComplete && (
                            <p className="text-sm font-bold text-orange-600">
                              {incompleteQuestions.length} question{incompleteQuestions.length > 1 ? 's' : ''} incomplete
                            </p>
                          )}
                        </div>
                      </button>
                      
                      <div className="flex items-center gap-2">
                        {!isComplete && (
                          <motion.button
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEditing(sectionIndex)}
                            className="px-4 py-2 font-black uppercase tracking-tight border-2 border-black bg-orange-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                            style={{ transform: "rotate(2deg)" }}
                          >
                            <Edit3 size={16} />
                            COMPLETE
                          </motion.button>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setActiveSection(activeSection === sectionIndex ? null : sectionIndex)}
                          className="p-2 text-2xl font-bold"
                        >
                          {activeSection === sectionIndex ? "▼" : "▶"}
                        </motion.button>
                      </div>
                    </div>

                    {/* Section Content */}
                    <AnimatePresence>
                      {activeSection === sectionIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.questions.map((question) => {
                              let answer = profileData[question.id];
                              
                              // Handle special cases for backend field names
                              if (question.type === "countryState" && !answer) {
                                // Check if we have separate country/state fields from backend
                                if (profileData?.country || profileData?.state) {
                                  answer = { country: profileData.country, state: profileData.state };
                                }
                              } else if (question.type === "ageRange" && !answer) {
                                // Check if we have agePreference field from backend
                                if (profileData?.agePreference) {
                                  answer = profileData.agePreference;
                                }
                              }
                              
                              const hasAnswer = isAnswerValid(question, answer);
                              
                              let displayAnswer = "Not answered";
                              
                              if (hasAnswer) {
                                if (question.type === "multiSelectGrid" || question.type === "multiSelect") {
                                  displayAnswer = question.options
                                    .filter((opt) => answer?.includes(opt.value))
                                    .map((opt) => `${opt.emoji} ${opt.label}`)
                                    .join(", ");
                                } else if (question.type === "singleChoice") {
                                  const option = question.options.find((opt) => opt.value === answer);
                                  displayAnswer = option ? `${option.emoji} ${option.label}` : answer;
                                } else if (question.type === "countryState") {
                                  // Handle both object format and separate fields
                                  if (answer && answer.country && answer.state) {
                                    displayAnswer = `${answer.country}, ${answer.state}`;
                                  } else if (profileData?.country && profileData?.state) {
                                    displayAnswer = `${profileData.country}, ${profileData.state}`;
                                  } else {
                                    displayAnswer = "Not answered";
                                  }
                                } else if (question.type === "ageRange") {
                                  // Handle both ageRange (frontend) and agePreference (backend) formats
                                  if (answer && answer.min && answer.max) {
                                    displayAnswer = `${answer.min} - ${answer.max} years`;
                                  } else if (profileData?.agePreference && profileData.agePreference.min && profileData.agePreference.max) {
                                    displayAnswer = `${profileData.agePreference.min} - ${profileData.agePreference.max} years`;
                                  } else {
                                    displayAnswer = "Not answered";
                                  }
                                } else if (question.type === "file") {
                                  // Handle file uploads - show file name or uploaded status
                                  if (answer instanceof File) {
                                    displayAnswer = `📁 ${answer.name}`;
                                  } else if (Array.isArray(answer) && answer.length > 0) {
                                    if (answer[0] instanceof File) {
                                      displayAnswer = `📁 ${answer.length} file(s) uploaded`;
                                    } else {
                                      displayAnswer = `📁 ${answer.length} image(s) uploaded`;
                                    }
                                  } else if (typeof answer === 'string' && answer.startsWith('http')) {
                                    displayAnswer = "📁 Image uploaded";
                                  } else {
                                    displayAnswer = "📁 File uploaded";
                                  }
                                } else {
                                  displayAnswer = answer;
                                }
                              }

                              return (
                                <div 
                                  key={question.id} 
                                  className={`p-4 border-2 ${hasAnswer ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'} rounded-lg`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-black uppercase text-gray-700">
                                      {question.question}
                                    </span>
                                    {!hasAnswer && (
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startEditing(sectionIndex, question.id)}
                                        className="px-2 py-1 text-xs font-bold bg-red-400 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                                        style={{ transform: "rotate(1deg)" }}
                                      >
                                        ADD
                                      </motion.button>
                                    )}
                                  </div>
                                  <span className={`text-base font-bold ${hasAnswer ? 'text-gray-800' : 'text-red-500'}`}>
                                    {displayAnswer}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Dashboard Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert("Dashboard coming soon!")}
                  className="px-8 py-4 font-black uppercase tracking-tight text-xl border-4 border-black bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all flex items-center gap-3 mx-auto"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  <Sparkles size={24} />
                  GO TO DASHBOARD
                  <Heart size={24} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={lightboxImage}
                  alt="Lightbox image"
                  className="max-w-[90vw] max-h-[90vh] object-contain border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"
                />
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white font-bold hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal for single-question edit mode */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
                onClick={handleModalCancel}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-black mb-4">Edit Answer</h2>
              <div className="mb-6">{renderQuestion()}</div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded font-bold border border-gray-400 hover:bg-gray-300"
                  onClick={handleModalCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded font-bold border border-blue-700 hover:bg-blue-700"
                  onClick={handleModalSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isFetching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            💕
          </motion.div>
          <p className="text-2xl font-black">LOADING YOUR VIBE...</p>
        </div>
      </motion.div>
    );
  }

  if (!isSectionSequentialEdit && (completed || (profileData && profileData.profileCompleted))) {
    return renderProfileView();
  }

  const currentAnswer = answers[currentQuestionData?.id] || profileData?.[currentQuestionData?.id];
  const isCurrentAnswerValid = currentQuestionData ? isAnswerValid(currentQuestionData, currentAnswer) : false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-4 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-2xl">
        {/* Progress and Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {/* Section Banner */}
          <div 
            className="text-center mb-6 p-4 border-4 border-black font-black text-2xl md:text-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            style={{
              backgroundColor: 
                currentSection === 0 ? COLORS.primary :
                currentSection === 1 ? COLORS.secondary :
                currentSection === 2 ? COLORS.accent1 :
                currentSection === 3 ? COLORS.accent3 :
                COLORS.accent2,
              transform: "rotate(-1deg)",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{currentSectionData.icon}</span>
              {currentSectionData.title}
            </div>
            <p className="text-sm font-bold mt-2 opacity-90">
              {currentSectionData.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white border-4 border-black h-8 mb-4 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <motion.div
              className="h-full transition-all duration-500 flex items-center justify-center text-white font-black text-sm"
              style={{
                width: `${((currentSection * 100) / sections.length) + 
                  ((currentQuestion * 100) / (sections.length * currentSectionData.questions.length))}%`,
                backgroundColor: COLORS.dark,
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)`,
              }}
            >
              {Math.round(((currentSection * 100) / sections.length) + 
                ((currentQuestion * 100) / (sections.length * currentSectionData.questions.length)))}%
            </motion.div>
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={`${currentSection}-${currentQuestion}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border-4 border-black p-6 md:p-8 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          style={{ transform: "rotate(0.5deg)" }}
        >
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase leading-tight">
              {currentQuestionData?.question}
            </h3>
            <div className="mt-6">
              {renderQuestion()}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={isEditMode ? cancelEditing : prevQuestion}
              disabled={!isEditMode && currentSection === 0 && currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-tight border-4 border-black ${
                !isEditMode && currentSection === 0 && currentQuestion === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
              }`}
              style={{ transform: "rotate(-1deg)" }}
            >
              <ArrowLeft size={20} />
              {isEditMode ? "CANCEL" : "BACK"}
            </motion.button>

            <div className="flex items-center gap-4">
              {/* Question Counter */}
              <div
                className="py-2 px-4 font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: COLORS.accent1, transform: "rotate(-2deg)" }}
              >
                {currentQuestion + 1}/{currentSectionData.questions.length}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                disabled={!isCurrentAnswerValid || loading}
                className={`flex items-center gap-2 px-6 py-3 font-black uppercase tracking-tight border-4 border-black ${
                  !isCurrentAnswerValid || loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                    : "bg-black text-white shadow-[4px_4px_0px_0px_rgba(78,205,196,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:translate-y-[-2px] transition-all"
                }`}
                style={{ transform: "rotate(1deg)" }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⭐
                    </motion.div>
                    SAVING...
                  </>
                ) : (
                  <>
                    {isEditMode ? "SAVE" : 
                     currentSection === 0 && currentQuestion === currentSectionData.questions.length - 1 ? "FINISH" : "NEXT"}
                    <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileQuestionnaire;