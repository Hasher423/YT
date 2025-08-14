# 🎬 YouTube Clone - Full-Stack Video Platform

A complete YouTube-like video platform built with modern web technologies, featuring video upload, streaming, user interactions, and real-time features.

## 🚀 Live Demo
[Live Demo](https://your-demo-link.com) *(Replace with your actual deployment URL)*

## ✨ Features

### 🔐 **Authentication & User Management**
- **User Registration** with channel creation
- **Secure Login/Logout** with JWT tokens
- **Profile Management** with custom logos and banners
- **Channel Customization** with unique branding

### 📹 **Video Management**
- **Video Upload** with real-time progress tracking
- **Multiple Format Support** (MP4, AVI, MOV, etc.)
- **Automatic Thumbnail Generation**
- **Video Compression & Optimization**
- **Cloud Storage** via Cloudinary
- **Video Streaming** with adaptive quality

### 👍 **Engagement Features**
- **Like/Dislike System** with user tracking
- **Comment System** with nested replies
- **Subscribe/Unsubscribe** functionality
- **View Counting** (30-second rule for authentic views)
- **Search Functionality** with MongoDB indexing
- **Video Sharing** capabilities

### 🔍 **Advanced Search**
- **Full-text Search** across video titles and descriptions
- **Search Suggestions** with autocomplete
- **Filtered Results** by relevance
- **Indexed Search** for fast performance

### 📊 **Analytics & Insights**
- **View Analytics** with unique viewer tracking
- **Engagement Metrics** (likes, comments, shares)
- **Subscriber Analytics**
- **Real-time Upload Progress**

### 🔔 **Real-time Features**
- **Live Upload Progress** via Socket.io
- **Real-time Notifications**
- **Instant Comment Updates**
- **Live Subscriber Counts**

### 📱 **Responsive Design**
- **Mobile-First Approach**
- **Cross-platform Compatibility**
- **Touch-friendly Interface**
- **Optimized for All Screen Sizes**

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Cloudinary** for media storage
- **Multer** for file uploads

### Database
- **MongoDB Atlas** for cloud database
- **Indexed Collections** for search optimization
- **Schema Validation** for data integrity

### Deployment
- **Vercel** for frontend hosting
- **Railway/Render** for backend hosting
- **Cloudinary** for media CDN

## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/         # Main application pages
│   │   ├── Context/       # React context providers
│   │   ├── Redux/         # Redux store and slices
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── Backend/
│   ├── Controllers/       # API route handlers
│   ├── Models/           # Database schemas
│   ├── Routes/          # Express routes
│   ├── Services/         # Business logic
│   ├── Middlewares/      # Authentication & validation
│   └── Config/          # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

2. **Backend Setup**
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

3. **Frontend Setup**
```bash
I have gathered sufficient information about the project structure and features. Now, I will create a comprehensive README file that showcases all the features of the project, including user authentication, video upload, commenting, and more.

### Proposed README Structure

**Project Title: Video Streaming Platform**

**Description:**
A video streaming platform that allows users to sign up, log in, upload videos, like/dislike videos, comment, and search for videos.

**Features:**
- **User Authentication:**
  - Sign up with username, email, password, channel name, logo, and background banner.
  - Log in and log out functionality.
  - User profile management.

- **Video Management:**
  - Upload videos with titles, descriptions, and thumbnails.
  - Real-time upload progress tracking.
  - Incremental view counting after 30 seconds of user view.

- **Interaction:**
  - Like and dislike videos.
  - Comment on videos.
  - Subscribe to channels.

- **Search Functionality:**
  - Search for videos by title or description.
  - Suggestions based on search queries.

- **Database:**
  - MongoDB for data storage with Mongoose ODM.
  - Cloudinary for video and image uploads.

**How to Run:**
1. Clone the repository.
2. Navigate to the `Backend` directory and install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in the `.env` file.
4. Start the backend server:
   ```bash
   npm start
   ```
5. Navigate to the `Frontend` directory and install dependencies:
   ```bash
   npm install
   ```
6. Start the frontend development server:
   ```bash
   npm run dev
   ```

**Testing:**
- Use Postman or Curl to test API endpoints.
- Ensure authentication tokens are provided for protected routes.

**Contact:**
For any issues or questions, please contact the development team.

---

I will now create the README files for both the `Frontend` and `Backend` directories with the above content. 

### Creating README files

1. **Backend README**: `Backend/readme.md`
2. **Frontend README**: `Frontend/frontend.readme`

Let's proceed with creating these files.

<create_file>
<path>Backend/readme.md</path>
<content>
# Video Streaming Platform - Backend

This directory contains the backend server code for the application, including API controllers, models, services, routes, configuration, and middleware.

## Features
- User Authentication
- Video Management
- Interaction (Like, Dislike, Comment)
- Search Functionality

## Structure
- **app.js**: Main entry point for the backend server application.
- **server.js**: Server startup script.
- **Config/**: Configuration files such as database connection and third-party service configs.
- **Controllers/**: Contains controller files that handle incoming API requests and responses.
- **DBConnection/**: Database connection setup and utilities.
- **Middlewares/**: Express middleware functions for authentication, error handling, etc.
- **models/**: Mongoose schema definitions for database collections.
- **Routes/**: Express route definitions mapping endpoints to controllers.
- **Services/**: Business logic and service layer functions used by controllers.
- **uploads/**: Directory for storing uploaded files such as videos and images.

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Set up environment variables in `.env`.
3. Start the server:
   ```
   npm start
   ```

## Testing
- API endpoints can be tested using tools like Postman or Curl.
- Ensure authentication tokens are provided for protected routes.

## Contact
For any issues or questions, please contact the development team.
