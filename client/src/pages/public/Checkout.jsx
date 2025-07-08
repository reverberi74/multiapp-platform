import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/shared/CartItem";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = () => {
    // Qui in futuro faremo la chiamata API
    console.log("Ordine inviato!", items);

    dispatch(clearCart());
    navigate("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p>Il carrello è vuoto.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Riepilogo ordine</h2>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className="text-right mt-4">
        <p className="text-xl font-bold">Totale: {subtotal.toFixed(2)} €</p>
        <button
          onClick={handleSubmitOrder}
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
        >
          Invia ordine
        </button>
      </div>
    </div>
  );
};

export default Checkout;
