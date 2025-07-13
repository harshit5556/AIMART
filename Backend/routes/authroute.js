import express from "express"
import {logout, login, registration, googleLogin, adminlogin } from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)
authRoutes.post("/googlelogin",googleLogin)
authRoutes.post("/adminlogin",adminlogin)
export default authRoutes