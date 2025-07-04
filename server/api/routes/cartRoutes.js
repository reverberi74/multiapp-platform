import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/CartController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Recupera il carrello dell'utente autenticato
router.get("/", authUser(), getCart);

// Aggiunge un prodotto al carrello
router.post("/", authUser(), addToCart);

// Aggiorna la quantità di un prodotto
router.put("/", authUser(), updateCartItem);

// Rimuove un prodotto dal carrello
router.delete("/", authUser(), removeFromCart);

export default router;
