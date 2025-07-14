import { useDispatch } from "react-redux";
import { setCart } from "../../store/slice/cartSlice";
import { useCartService } from "../../services/useCartService";
import CustomImage from "./CustomImage";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { updateCartItem, removeFromCart } = useCartService();

  const handleIncrement = async () => {
    try {
      const res = await updateCartItem(item.productId?._id, item.quantity + 1);
      dispatch(setCart(res.products)); // ✅
    } catch (error) {
      console.error("Errore incrementando:", error);
    }
  };

  const handleDecrement = async () => {
    try {
      if (item.quantity === 1) {
        await handleRemove();
      } else {
        const res = await updateCartItem(item.productId?._id, item.quantity - 1);
        dispatch(setCart(res.products)); // ✅
      }
    } catch (error) {
      console.error("Errore decrementando:", error);
    }
  };

  const handleRemove = async () => {
    try {
      const res = await removeFromCart(item.productId?._id);
      dispatch(setCart(res.products)); // ✅
    } catch (error) {
      console.error("Errore rimuovendo:", error);
    }
  };
  return (
    <div className="flex items-center border-b py-4">
      <CustomImage
        src={item.productId?.image || "/placeholder.png"}
        alt={item.productId?.name || "Prodotto"}
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex-1">
        <h3 className="font-semibold">
          {item.productId?.name || "Prodotto non disponibile"}
        </h3>
        <p>
          {(item.productId?.price?.toFixed(2) || "--")} € x {item.quantity}
        </p>
        <p className="font-bold">
          Totale: {(
            (item.productId?.price || 0) * item.quantity
          ).toFixed(2)} €
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="bg-gray-300 px-2 rounded"
          >
            -
          </button>
          <button
            onClick={handleIncrement}
            className="bg-gray-300 px-2 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Rimuovi
      </button>
    </div>
  );
};

export default CartItem;
