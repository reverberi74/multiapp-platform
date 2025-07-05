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
import categoryRoutes from "./api/routes/categoryRoutes.js";
import labelRoutes from "./api/routes/labelRoutes.js";
import cartRoutes from "./api/routes/cartRoutes.js";
import orderRoutes from "./api/routes/orderRoutes.js";


const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/entities", entityRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/users", userRoutes);

// Catch-all per rotte non trovate
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

connect();

app.listen(PORT, () => {
  log(`Server avviato su http://localhost:${PORT}`);
});


