# Project Readme

This project is a full-stack web application with separate Backend and Frontend directories.

## Backend

- Node.js with Express framework.
- MongoDB with Mongoose ODM.
- Handles API endpoints, authentication, video uploads, and user management.
- Uses Cloudinary for media storage.
- Real-time upload progress with Socket.io.
- Organized into Controllers, Services, Models, Routes, Middlewares, and Config.

## Frontend

- React application using functional components and hooks.
- State management with Redux Toolkit.
- Styling with Tailwind CSS.
- Routing with React Router.
- Organized into Components, Pages, Redux features, Context, and Utilities.

## How to Run

### Backend

1. Navigate to Backend directory.
2. Install dependencies: `npm install`
3. Set environment variables in `.env`.
4. Start server: `npm start`

### Frontend

1. Navigate to Frontend directory.
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Testing

- Backend API endpoints can be tested with Postman or Curl.
- Frontend can be tested by interacting with UI components.
- Ensure authentication tokens are used for protected routes.
- Verify video upload and user video array update functionality.

## Contact

For questions or issues, contact the development team.
