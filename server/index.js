import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { databaseConnection } from "./data/databaseConnection.js";
import userRoutes from "./routes/user.Routes.js";
import listRoutes from "./routes/listing.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

// Load environment variables
dotenv.config();

// Connect to the database
databaseConnection();

// Initialize Express
const server = express();

// Configure CORS
server.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allows cookies to be sent with requests
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  })
);

// Middleware to parse JSON and cookies
server.use(express.json());
server.use(cookieParser());

// API Routes
server.use("/api/user", userRoutes);
server.use("/api/listing", listRoutes);

// Error Handling Middleware
server.use(errorMiddleware);

// Start the server

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
