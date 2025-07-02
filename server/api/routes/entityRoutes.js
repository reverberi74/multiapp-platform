import express from "express";
import {
  createEntity,
  getEntities,
  getEntityById,
  updateEntity,
  deleteEntity,
} from "../controllers/entityController.js";

import { authUser } from "../../middleware/authUser.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = express.Router();

// ✅ Recupera tutte le entity
router.get("/", getEntities);

// ✅ Recupera una singola entity
router.get("/:id", getEntityById);

// ✅ Crea una nuova entity (solo admin e business)
router.post(
  "/",
  authUser(),
  checkRole(["admin", "business"]),
  createEntity
);

// ✅ Aggiorna un'entity (solo admin e business)
router.put(
  "/:id",
  authUser(),
  checkRole(["admin", "business"]),
  updateEntity
);

// ✅ Elimina un'entity (solo admin e business)
router.delete(
  "/:id",
  authUser(),
  checkRole(["admin", "business"]),
  deleteEntity
);

export default router;
