import express from "express";
import { createListing } from "../controllers/listing.controllers.js";

const listRoutes = express.Router();

listRoutes.post("/create", createListing);

export default listRoutes;
