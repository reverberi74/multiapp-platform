import express from "express";
import { upload } from "../../middleware/upload.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Create Product (protetto)
router.post(
  "/",
  authUser(),
  upload.single("image"), // campo form-data che contiene il file
  createProduct
);

// Get All Products (pubblico)
router.get("/", getProducts);

// Get Single Product (pubblico)
router.get("/:id", getProduct);

// Update Product (protetto)
router.put(
  "/:id",
  authUser(),
  upload.single("image"), // Multer intercetta il file
  updateProduct
);

// Delete Product (protetto)
router.delete("/:id", authUser(), deleteProduct);

export default router;
