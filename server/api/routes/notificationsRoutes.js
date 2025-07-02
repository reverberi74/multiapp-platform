import express from "express";
import { authUser } from "../../middleware/authUser.js";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationsController.js";

const router = express.Router();

// Protegge tutte le rotte
router.use(authUser());

// Crea notifica
router.post("/", createNotification);

// Recupera notifiche dell'utente autenticato
router.get("/", getUserNotifications);

// Marca come letta
router.patch("/:id/read", markNotificationAsRead);

// Elimina notifica
router.delete("/:id", deleteNotification);

export default router;
