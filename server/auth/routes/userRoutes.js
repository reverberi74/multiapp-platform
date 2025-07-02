import express from "express";
import { updateUserRole } from "../controllers/usersController.js";
import { authUser } from "../../middleware/authUser.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = express.Router();

// Endpoint per aggiornare il ruolo
router.put(
  "/:id/role",
  authUser(),            // <-- ora la funzione è invocata
  checkRole(["admin"]),  // <-- ruolo richiesto
  updateUserRole
);

export default router;


