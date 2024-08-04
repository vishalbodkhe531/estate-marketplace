import express from "express";
import { config } from "dotenv";
import { databaseConnection } from "./data/databaseConnection.js";
config({ path: "./config/.env" });

databaseConnection();
const server = express();

// config({ path: "./config/.env" });

server.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
// server.listen(2344, () => {
//   console.log(`server is working on http://localhost:2344`);
// });
