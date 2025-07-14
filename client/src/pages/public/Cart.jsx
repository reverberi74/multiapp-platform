// src/pages/public/Cart.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/slice/cartSlice";
import { useCartService } from "../../services/useCartService";
import CartItem from "../../components/shared/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { fetchCart } = useCartService();

  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart();
        dispatch(setCart(res.products || []));
      } catch (error) {
        console.error("Errore caricamento carrello:", error);
      }
    };

    loadCart();
  }, [dispatch]);

  // Filtro eventuali prodotti nulli o non popolati
  const filteredItems = items.filter(
    (item) => !!item && !!item.productId && !!item.productId._id
  );

  const subtotal = filteredItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Il tuo carrello</h2>
      {filteredItems.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          {filteredItems.map((item) => (
            <CartItem
              key={item._id || item.productId._id}
              item={item}
            />
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">
              Subtotale: {subtotal.toFixed(2)} €
            </p>
            <Link
              to="/checkout"
              className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Procedi al checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
