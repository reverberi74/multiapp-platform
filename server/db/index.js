import mongoose from "mongoose";
import { log } from "../utilities/logs.js";
import User from "./models/User.js";
import BusinessProfile from "./models/BusinessProfile.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Ottieni __dirname per ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carica .env dalla root del progetto
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const DB_URI = process.env.DB_URI;

export const connect = async () => {
  try {
    await mongoose.connect(DB_URI);
    log("Database connected...");
  } catch (err) {
    log(err.message, "error");
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    log("Database disconnected...");
  } catch (err) {
    log(err.message, "error");
  }
};

// Export nominati singoli
export { User, BusinessProfile };
