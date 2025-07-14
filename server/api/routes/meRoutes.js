import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { getMeInfo, updateMe } from "../controllers/meController.js";

const router = express.Router();

router.get("/", authUser(), getMeInfo);
router.put("/", authUser(), updateMe);

export default router;
