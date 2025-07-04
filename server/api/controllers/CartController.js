import Cart from "../../db/models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.productId");
    if (!cart) {
      return res.status(200).json({ products: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [{ productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

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

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
