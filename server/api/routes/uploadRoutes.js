import express from "express";
import path from "path";
import fs from "fs";
import { upload } from "../../middleware/upload.js";
import { authUser } from "../../middleware/authUser.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Rotta protetta per upload file
router.post(
  "/",
  authUser(),
  upload.single("image"),
  uploadFile
);

// Rotta protetta per download file
router.get("/:filename", authUser(), (req, res) => {
  const { filename } = req.params;

  // Percorso assoluto nella cartella uploads
  const filePath = path.join(process.cwd(), "uploads", filename);

  // Verifica se il file esiste
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File non trovato" });
  }

  // Restituisce il file in download
  return res.download(filePath);
});

export default router;
