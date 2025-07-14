import express from "express";
import { updateUserRole } from "../controllers/usersController.js";
import { authUser } from "../../middleware/authUser.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = express.Router();

// 🟢 Solo admin può aggiornare il ruolo di un utente
router.put(
  "/:id/role",
  authUser(),            // Verifica autenticazione
  checkRole(["admin"]),  // Verifica autorizzazione
  updateUserRole         // Esegue aggiornamento
);

export default router;


