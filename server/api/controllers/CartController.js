// server/api/controllers/CartController.js

import Cart from "../../db/models/Cart.js";
import Product from "../../db/models/Product.js";

// Recupera il carrello
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.productId");
    if (!cart) {
      return res.status(200).json({ products: [] });
    }
    res.status(200).json({
      products: cart.products
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggiunge un prodotto al carrello
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Recupera prodotto per il prezzo snapshot
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Prodotto non trovato." });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [
          {
            productId,
            quantity,
            priceSnapshot: product.price,
          },
        ],
      });
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          productId,
          quantity,
          priceSnapshot: product.price,
        });
      }

      await cart.save();
    }

    // 🔹 Popola il carrello aggiornato
    const populatedCart = await Cart.findOne({ _id: cart._id }).populate({
      path: "products.productId",
      select: "name price image",
    });

    res.status(200).json({
      success: true,
      products: populatedCart.products,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggiorna la quantità di un prodotto nel carrello
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;

    await cart.save();

    const populatedCart = await Cart.findOne({ _id: cart._id }).populate({
      path: "products.productId",
      select: "name price image"
    });

    res.status(200).json({
      products: populatedCart.products
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Rimuove un prodotto dal carrello
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();

    const populatedCart = await Cart.findOne({ _id: cart._id }).populate({
      path: "products.productId",
      select: "name price image"
    });

    return res.status(200).json({
      success: true,
      products: populatedCart.products
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
