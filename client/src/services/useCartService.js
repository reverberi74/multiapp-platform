// src/services/useCartService.js
import { useApi } from "../hooks/useApi";

export const useCartService = () => {
  const { get, post, put, del } = useApi();

  // Recupera l'intero carrello
  const fetchCart = async () => {
    return await get("/cart");
  };

  // Aggiunge un prodotto al carrello
  const addToCart = async (productId, quantity) => {
    return await post("/cart", { productId, quantity });
  };

  // Aggiorna la quantità di un prodotto
  const updateCartItem = async (productId, quantity) => {
    return await put(`/cart/${productId}`, { quantity });
  };

  // Rimuove un prodotto dal carrello
  const removeFromCart = async (productId) => {
    return await del(`/cart/${productId}`);
  };

  return {
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
  };
};
