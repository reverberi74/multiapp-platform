import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/OrderController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Crea ordine dal carrello (protetto)
router.post("/", authUser(), createOrder);

// Recupera ordini dell'utente (protetto)
router.get("/", authUser(), getUserOrders);

// Aggiorna stato ordine (protetto)
router.put("/:id/status", authUser(), updateOrderStatus);

// Elimina ordine (protetto)
router.delete("/:id", authUser(), deleteOrder);

export default router;
