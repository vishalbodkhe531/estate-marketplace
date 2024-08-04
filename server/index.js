import express from "express";
import { config } from "dotenv";
import { databaseConnection } from "./data/databaseConnection.js";
import userRoutes from "./routes/user.Routes.js";
config({ path: "./config/.env" });

databaseConnection();

const server = express();

server.use("/api/user", userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
