import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../db/models/User.js";

// Ottieni __dirname per ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carica .env dal livello superiore
dotenv.config({ path: path.resolve(__dirname, "../.env") });

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Un admin esiste già:", existingAdmin.email);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("SuperPassword123!", 10);

    const admin = new User({
      first_name: "Super",
      last_name: "Admin",
      email: "admin@tuosito.com",
      password: hashedPassword,
      role: "admin",
      is_active: true
    });

    await admin.save();
    console.log("✅ Admin creato con successo:", admin.email);

    process.exit();
  } catch (error) {
    console.error("Errore creazione admin:", error);
    process.exit(1);
  }
})();
