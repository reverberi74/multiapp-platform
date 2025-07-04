import express from "express";
import {
  createLabel,
  getLabels,
  getLabel,
  updateLabel,
  deleteLabel,
} from "../controllers/LabelController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Create Label (protetto)
router.post("/", authUser(), createLabel);

// Get All Labels (pubblico)
router.get("/", getLabels);

// Get Single Label (pubblico)
router.get("/:id", getLabel);

// Update Label (protetto)
router.put("/:id", authUser(), updateLabel);

// Delete Label (protetto)
router.delete("/:id", authUser(), deleteLabel);

export default router;
