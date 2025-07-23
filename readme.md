# Project README

## Overview

This project is a full-stack video sharing web application that allows users to upload, view, like, and comment on videos. It features user authentication, video management, and real-time upload progress tracking.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Cloudinary, Socket.io
- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router, Vite

## Folder Structure

```
/
├── Backend/
│   ├── Controllers/       # API route handlers
│   ├── Services/          # Business logic and database operations
│   ├── models/            # Mongoose schemas
│   ├── Routes/            # Express route definitions
│   ├── Middlewares/       # Express middlewares (auth, error handling)
│   ├── Config/            # Configuration files (DB, Cloudinary, etc.)
│   ├── DBConnection/      # Database connection setup
│   ├── uploads/           # Uploaded media files
│   ├── app.js             # Express app setup
│   ├── server.js          # Server startup
│   └── backend.readme     # Backend specific documentation
├── Frontend/
│   ├── src/
│   │   ├── Components/    # React components
│   │   ├── Pages/         # React pages
│   │   ├── redux/         # Redux store and slices
│   │   ├── Context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main React app component
│   ├── public/            # Static assets
│   ├── frontend.readme    # Frontend specific documentation
│   ├── index.html         # HTML entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── .env                   # Environment variables
├── package.json           # Root dependencies (if any)
├── readme.md              # This file
└── .gitignore             # Git ignore rules
```

## Features

- User registration and authentication
- Video upload with thumbnail support
- Real-time upload progress using Socket.io
- Video viewing with like/dislike functionality
- Commenting on videos
- User profile management
- Pagination for video listings

## Setup and Usage

### Backend

1. Navigate to the `Backend` directory:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with necessary environment variables (e.g., MongoDB URI, Cloudinary credentials).
4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `Frontend` directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open the app in your browser at the provided local URL.

## API Routes

### User Routes

- `POST /api/users/signup` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile
- Other user-related routes...

### Video Routes

- `POST /api/videos` - Upload a new video
- `GET /api/videos` - Get list of videos with pagination
- `GET /api/videos/:id` - Get video details
- `POST /api/videos/:id/like` - Like a video
- `POST /api/videos/:id/dislike` - Dislike a video
- Other video-related routes...

## Testing

- Use Postman or Curl to test API endpoints.
- Verify authentication and authorization flows.
- Test video upload and ensure the user's videos array updates correctly.
- Check frontend UI interactions and state updates.

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Push to your fork and create a pull request.

## Contact

For questions or support, please contact the development team.
