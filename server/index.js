import express from "express";
import cors from "cors";
import { connect } from "./db/index.js";
import { log } from "./utilities/logs.js";
import authRoutes from "./auth/routes/authRoutes.js";
import meRoutes from "./api/routes/meRoutes.js";
import userRoutes from "./auth/routes/userRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import entityRoutes from "./api/routes/entityRoutes.js";
import uploadRoutes from "./api/routes/uploadRoutes.js";
import notificationsRoutes from "./api/routes/notificationsRoutes.js";
import productRoutes from "./api/routes/productRoutes.js";
import categoryRoutes from "./api/routes/CategoryRoutes.js";
import labelRoutes from "./api/routes/labelRoutes.js";
import cartRoutes from "./api/routes/cartRoutes.js";
import orderRoutes from "./api/routes/orderRoutes.js";
import couponRoutes from "./api/routes/couponRoutes.js";
import accountRoutes from "./api/routes/accountRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// configurazione CORS 
app.use(
  cors({
    origin: "http://localhost:5173", // l'URL del frontend
    credentials: true,               // permette cookie e token
  })
);

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Le tue API
app.use("/api/entities", entityRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Catch-all per rotte non trovate
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Connessione DB e avvio server
connect();
app.listen(PORT, () => {
  log(`Server avviato su http://localhost:${PORT}`);
});
