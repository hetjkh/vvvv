# Dating App Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/dating-app

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Giphy API
GIPHY_API_KEY=your-giphy-api-key

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Start the Server
```bash
npm start
```

The server will run on port 5000 by default.

## API Endpoints

- `POST /user/profile` - Save user profile with file uploads
- `GET /user/profile` - Get user profile
- `POST /user/add-chat-partner` - Add chat partner
- `GET /user/chat-partners` - Get chat partners
- `GET /user/chat-messages/:partnerId` - Get chat messages
- `GET /gifs/search` - Search GIFs

## File Uploads

The backend supports file uploads for:
- Avatar (single image)
- Bio image (single image)
- Gallery images (multiple images, max 7)

Files are uploaded to Cloudinary and the local files are cleaned up automatically. 