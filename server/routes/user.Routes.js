import express from "express";

const userRoutes = express();

userRoutes.post("/register", userRegister);

export default userRoutes;
