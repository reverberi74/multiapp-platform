import { useSelector } from "react-redux";
import CartItem from "../../components/shared/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Il tuo carrello</h2>
      {items.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
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
