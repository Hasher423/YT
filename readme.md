
# 🎬 Full-Stack Video Sharing Platform

A powerful **YouTube-like web application** built with **MERN stack**, enabling users to upload, stream, and interact with videos in real-time.

---

## 🧰 Tech Stack

**Frontend**:
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
- ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

**Backend**:
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongodb&logoColor=white)
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-405DE6?style=flat-square&logo=cloudinary&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white)

---

## 🗂 Folder Structure

```
/
├── Backend/
│   ├── Controllers/       # Route logic
│   ├── Services/          # Business logic
│   ├── Models/            # Mongoose schemas
│   ├── Routes/            # API routes
│   ├── Middlewares/       # Auth, error handling
│   ├── Config/            # DB & third-party configs
│   ├── DBConnection/      # MongoDB connection
│   ├── uploads/           # Raw uploaded files
│   ├── app.js             # Express app
│   ├── server.js          # Server bootstrap
│   └── backend.readme     # Backend notes
├── Frontend/
│   ├── src/
│   │   ├── Components/    # Reusable UI
│   │   ├── Pages/         # App screens
│   │   ├── redux/         # Slices & store
│   │   ├── Context/       # React context
│   │   ├── utils/         # Helpers
│   │   └── App.jsx        # Root component
│   ├── public/            # Assets
│   ├── frontend.readme    # Frontend notes
│   ├── index.html         # HTML root
│   └── vite.config.js     # Vite setup
├── .env
├── package.json
├── readme.md
└── .gitignore
```

---

## ✨ Features

- 🔐 Secure user signup & login (JWT auth)
- 🎥 Upload video + custom thumbnail
- 🚀 Real-time upload progress (Socket.io)
- 📺 Smooth video streaming
- ❤️ Like / Dislike
- 💬 Comments with timestamps
- 🧑‍💼 User profile page
- 🔎 Paginated video feed
- 📱 Fully responsive UI

---

## ⚙️ Setup Guide

### Backend

```bash
cd Backend
npm install
# Create a .env file with the following:
# MONGO_URI=your_mongodb_url
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
# Open http://localhost:5173
```

---

## 📡 API Routes

### User

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | `/api/users/signup`  | Register a new user   |
| POST   | `/api/users/login`   | Login existing user   |
| GET    | `/api/users/:id`     | Get user profile info |

### Video

| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| POST   | `/api/videos`             | Upload a new video   |
| GET    | `/api/videos`             | List all videos      |
| GET    | `/api/videos/:id`         | Get single video     |
| POST   | `/api/videos/:id/like`    | Like a video         |
| POST   | `/api/videos/:id/dislike` | Dislike a video      |

---

## 🧪 Testing

- Use **Postman** to test endpoints
- Validate **JWT auth** and route protection
- Simulate **upload progress**
- Check **UI interactivity** with Redux state updates

---

## 🧠 Contribution Guide

1. Fork the repo
2. Create a new branch
3. Make changes with clear commits
4. Push and open a PR

---

## 📬 Contact

Have questions or suggestions?

**Email:** hasher423@gmail.com  
**GitHub Issues:** Submit here!

---

> _“Built to be scalable, intuitive, and fun to use — a full YouTube-like experience in your hands.”_
