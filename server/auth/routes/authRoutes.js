import express from "express";
import { signup } from "../controllers/signupController.js";
import login from "../../auth/controllers/loginController.js";

const router = express.Router();

// Registrazione (self-signup)
router.post("/signup", signup);

// Login
router.post("/login", login);

export default router;


