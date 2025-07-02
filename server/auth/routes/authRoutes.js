// server/auth/routes/auth.js
import express from "express";
import login from "../controllers/loginController.js";
import { createUser } from "../controllers/usersController.js";

const router = express.Router();

// Login
router.post("/login", login);

// Registrazione
router.post("/register", createUser);

export default router;

