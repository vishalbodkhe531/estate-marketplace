import express from "express";
import { userLogin, userRegister } from "../controllers/user.controllers.js";

const userRoutes = express();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);

export default userRoutes;
