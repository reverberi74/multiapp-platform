import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Create Category (protetto)
router.post("/", authUser(), createCategory);

// Get All Categories (pubblico)
router.get("/", getCategories);

// Get Single Category (pubblico)
router.get("/:id", getCategory);

// Update Category (protetto)
router.put("/:id", authUser(), updateCategory);

// Delete Category (protetto)
router.delete("/:id", authUser(), deleteCategory);

export default router;
