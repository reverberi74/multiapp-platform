import Product from "../../db/models/Product.js";
import fs from "fs";
import path from "path";


// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, labels, stock, isActive } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      labels,
      stock,
      isActive,
      image: req.file ? req.file.filename : "", // salva nome file se presente
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("labels", "name")
      .populate("createdBy", "first_name last_name");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("labels", "name")
      .populate("createdBy", "first_name last_name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, labels, stock, isActive } = req.body;

    const updateData = {
      name,
      description,
      price,
      category,
      labels,
      stock,
      isActive,
    };

    // Se è stato caricato un file, aggiorna l'immagine
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    // Prima recupera il prodotto
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Se esiste un'immagine, cancella il file fisico
    if (product.image) {
      const filePath = path.join(process.cwd(), "/uploads/", product.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Ora elimina il documento dal DB
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product and image deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};
