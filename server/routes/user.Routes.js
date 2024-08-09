import express from "express";
import {
  deleteUser,
  googleAuth,
  updateUser,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const userRoutes = express();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.post("/google-auth", googleAuth);
userRoutes.get("/logout-user", isAuthenticated, userLogout);
userRoutes.delete("/delete-user/:id", isAuthenticated, deleteUser);
userRoutes.put("/update-user/:id", isAuthenticated, updateUser);

export default userRoutes;
