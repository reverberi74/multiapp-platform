// src/pages/public/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useCartService } from "../../services/useCartService";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/slice/cartSlice";
import { useToast } from "../../hooks/useToast";
import CustomImage from "../../components/shared/CustomImage";

const ProductDetail = () => {
  const { id } = useParams();
  const { get } = useApi();
  const { addToCart, fetchCart } = useCartService();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get(`/products/${id}`);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Errore nel caricamento prodotto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, get]);

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(product._id, 1);
      if (res && res.products) {
        dispatch(setCart(res.products));
      } else if (res && res.cart && res.cart.products) {
        dispatch(setCart(res.cart.products));
      } else {
        // Fallback se non torna nulla
        toast.success("Prodotto aggiunto al carrello.");
        // Eventuale ricarica del carrello
        const freshCart = await fetchCart();
        dispatch(setCart(freshCart.products));
      }
    } catch (err) {
      console.error("Errore aggiungendo al carrello:", err);
      toast.error("Errore durante l'aggiunta al carrello.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <p>Caricamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">{error}</div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <CustomImage
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mb-4">{product.price} €</p>
      <p className="text-sm text-gray-600 mb-4">
        Disponibili: {product.stock}
      </p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Aggiungi al carrello
      </button>
    </div>
  );
};

export default ProductDetail;
