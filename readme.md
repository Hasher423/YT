# 🎬 YouTube Clone - Full-Stack Video Platform

A **modern MERN stack video platform** featuring real-time video uploads, streaming, user interactions, and scalable state management with **Redux**. Built to showcase full-stack skills and best practices.

---

## ✨ Features

### 🔐 Authentication & User Management
- 📝 **User Registration** with channel creation (username, email, password, channel name, logo, banner)  
- 🔒 **Secure Login/Logout** using JWT tokens  
- 🖼️ **Profile Management** with custom logos & banners  
- 🎨 **Channel Customization** with unique branding  

### 📹 Video Management
- 📤 **Video Upload** with **live progress tracking** via Socket.io  
- ☁️ **Cloud Storage** via Cloudinary CDN  
- 🖱️ **Drag & Drop Upload Interface**  

### 👍 Engagement Features
- ❤️ **Like/Dislike** system with user tracking  
- 💬 **Comments** with real-time updates  
- 🧑‍🤝‍🧑 **Subscribe/Unsubscribe** with live subscriber counts  
- 👀 **View Counting** (30-second rule for authentic views) 

### 🔍 Advanced Search
- 🔎 **Full-text Search** on video titles and descriptions  
- 💡 **Search Suggestions** on enter  
- ⚡ **Instant Results** with relevance scoring  

### 📊 Analytics & Insights
- 📈 **View Analytics** with unique viewer tracking  
- 👍 **Engagement Metrics**: likes, dislikes, comments count  
- 🧑‍💼 **Subscriber Analytics** with real-time updates  
- 📊 **Channel Performance Tracking**  

### 🔔 Real-time Features
- ⏱️ **Live Upload Progress** via Socket.io events  
- 💬 **Instant Comment Updates**  
- 🧑‍🤝‍🧑 **Live Subscriber Counts**  

### 📱 Responsive Design
- 📱 **Mobile-First Approach** using Tailwind CSS  
- 🖐️ **Touch-Friendly Interface**  
- 🖥️ **Optimized for All Screen Sizes**  

---

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)  
- ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)  
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)  
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)  
- Axios, React Router, Socket.io Client  

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)  
- ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)  
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)  
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongodb&logoColor=white)  
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-405DE6?style=flat-square&logo=cloudinary&logoColor=white)  
- Socket.io, JWT, Bcrypt  

---


## 📁 Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── ChannelHome.jsx       # Channel homepage
│   │   │   ├── ChannelInfo.jsx       # Channel information
│   │   │   ├── ChannelVideos.jsx     # Channel videos list
│   │   │   ├── Comments.jsx          # Video comments
│   │   │   ├── CommentsSection.jsx   # Comments container
│   │   │   ├── Controls.jsx          # Video controls
│   │   │   ├── InteractionBar.jsx    # Like/dislike/subscribe
│   │   │   ├── Loader.jsx            # Loading states
│   │   │   ├── MainVideos.jsx        # Homepage videos
│   │   │   ├── SearchBar.jsx         # Search functionality
│   │   │   ├── SearchResults.jsx     # Search results display
│   │   │   ├── SideBar.jsx           # Navigation sidebar
│   │   │   ├── SideVideos.jsx        # Related videos
│   │   │   ├── Socket.jsx            # Socket.io connection
│   │   │   ├── VideoDescription.jsx  # Video details
│   │   │   ├── VideoInfo.jsx         # Video metadata
│   │   │   ├── Videoplay.jsx         # Video player
│   │   │   ├── VideoPlayerElement.jsx # Enhanced player
│   │   │   └── VideoWrapper.jsx      # Video container
│   │   ├── Pages/
│   │   │   ├── ChannelProfile.jsx    # Channel page
│   │   │   ├── Home.jsx              # Homepage
│   │   │   ├── IsLoggedIn.jsx        # Auth wrapper
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Signup.jsx            # Registration page
│   │   │   ├── UploadVideo.jsx       # Video upload page
│   │   │   └── VideoPlayer.jsx       # Video watch page
│   │   ├── Context/
│   │   │   └── VideosContext.jsx     # Video state management
│   │   ├── Redux/
│   │   │   ├── store.js              # Redux store
│   │   │   └── features/
│   │   │       ├── commentSlice.js   # Comments state
│   │   │       └── videoSlice.js     # Videos state
│   │   └── utils/
│   │       └── Ago.js                # Time formatting
│   └── public/
│       └── assets/                   # Static assets
│
├── Backend/
│   ├── Controllers/
│   │   ├── user.controller.js        # User management
│   │   ├── video.controller.js       # Video operations
│   │   ├── comment.controller.js     # Comments
│   │   ├── search.controller.js      # Search functionality
│   │   └── initSocket.controller.js  # Socket.io setup
│   ├── Models/
│   │   ├── user.model.js             # User schema
│   │   ├── video.model.js            # Video schema
│   │   ├── comment.model.js          # Comment schema
│   │   └── videoView.js              # View tracking
│   ├── Routes/
│   │   ├── user.routes.js            # User endpoints
│   │   ├── video.routes.js           # Video endpoints
│   │   ├── comment.routes.js         # Comment endpoints
│   │   └── search.routes.js          # Search endpoints
│   ├── Services/
│   │   ├── user.service.js           # User business logic
│   │   ├── video.service.js          # Video operations
│   │   ├── comment.service.js        # Comment operations
│   │   ├── search.service.js         # Search algorithms
│   │   └── videoUpload.service.js    # Upload handling
│   ├── Middlewares/
│   │   └── auth.middleware.js        # Authentication
│   ├── Config/
│   │   ├── cloudinary.config.js      # Cloudinary setup
│   │   └── multer.config.js          # File upload config
```

## 🚀 Getting Started


### Prerequisites
- Node.js v16+  
- MongoDB Atlas account  
- Cloudinary account  
- Git  

### Installation

1. **Clone Repo**  
```bash
git clone https://github.com/HASHERprogrammer/yt.git
cd yt

2. **Backend Setup**
cd Backend
npm install
cp .env.example .env


3. **Environment Variables**
Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

4. **Start Backend Server**
```bash
npm start
# or for development
npm run dev
```

5. **Frontend Setup**
```bash
cd ../Frontend
npm install
```

6. **Frontend Environment Variables**
Create a `.env` file in the Frontend directory:
```env
VITE_BACKEND_URI=http://localhost:3000
```

7. **Start Frontend Development Server**
```bash
npm run dev
```

8. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📖 API Documentation

### Authentication Endpoints
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `POST /user/logout` - User logout
- `GET /user/getuser` - Get current user
- `GET /user/validate-token` - Validate JWT token

### Video Endpoints
- `POST /video/upload` - Upload new video
- `GET /video/getvideos` - Get all videos (pagination)
- `GET /video/getvideo?v=videoId` - Get specific video
- `POST /video/increase-view/:videoId` - Increment view count
- `POST /video/like/:videoId` - Like/unlike video
- `POST /video/dislike/:videoId` - Dislike/undislike video

### Comment Endpoints
- `POST /comment/:videoId` - Add comment
- `GET /comment/getcomments` - Get all comments

### Search Endpoints
- `GET /search?q=query` - Search videos
- `GET /search/suggestions?q=query` - Get search suggestions

### User Endpoints
- `GET /user/getUserVideos/:userId` - Get user's videos
- `POST /user/subscription/:channelId` - Subscribe/unsubscribe
- `GET /user/isSubscribed/:channel` - Check subscription status




### Environment Variables for Production
- Update all URLs to production domains
- Set secure cookie flags
- Configure CORS for production frontend
- Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **HASHERprogrammer** - Initial work - [HASHERprogrammer](https://github.com/HASHERprogrammer)

## 🙏 Acknowledgments

- ⚛️ React community
- 🍃 MongoDB team
- ☁️ Cloudinary
- 🔌 Socket.io team


## 📞 Support

For support, email hasher423@gmail.com 

---

**Built with ❤️ by [HASHERprogrammer](https://github.com/HASHERprogrammer)**

