import express from "express";
import {
  createListing,
  deleteList,
  getList,
} from "../controllers/listing.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const listRoutes = express.Router();

listRoutes.post("/create", createListing);
listRoutes.get("/getList/:id", isAuthenticated, getList);
listRoutes.delete("/delete/:id", isAuthenticated, deleteList);

export default listRoutes;
