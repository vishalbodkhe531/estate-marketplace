import express from "express";
import { config } from "dotenv";
import { databaseConnection } from "./data/databaseConnection.js";
import userRoutes from "./routes/user.Routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import listRoutes from "./routes/listing.routes.js";
config({ path: "./config/.env" });

databaseConnection();

const server = express();

server.use(express.json());

server.use(cookieParser());

server.use("/api/user", userRoutes);
server.use("/api/listing", listRoutes);

server.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
