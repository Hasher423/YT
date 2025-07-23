# Backend Directory Readme

This directory contains the backend server code for the application, including API controllers, models, services, routes, configuration, and middleware.

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
- **node_modules/**: Installed npm packages.
- **package.json** and **package-lock.json**: Project dependencies and lock files.
- **.env**: Environment variables configuration file.
- **.gitignore**: Git ignore rules.

## Key Points

- The backend uses Node.js with Express framework.
- MongoDB is used as the database with Mongoose ODM.
- Cloudinary is used for video and image uploads.
- Socket.io is integrated for real-time upload progress events.
- Authentication middleware protects routes requiring user identification.
- Controllers handle request validation, file uploads, and response formatting.
- Services encapsulate database operations and business logic.

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
- Verify video uploads and user video array updates work as expected.

## Contact

For any issues or questions, please contact the development team.
