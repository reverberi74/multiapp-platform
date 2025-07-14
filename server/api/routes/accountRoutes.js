import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { changeEmail } from "../controllers/emailController.js";
import { changePassword } from "../controllers/passwordController.js";

const router = express.Router();

router.put("/email", authUser(), changeEmail);
router.put("/password", authUser(), changePassword);

export default router;
