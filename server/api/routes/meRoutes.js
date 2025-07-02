import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { getMeInfo } from "../controllers/meController.js";

const router = express.Router();

router.get("/", authUser(), getMeInfo);

export default router;
