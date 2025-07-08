import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slice/cartSlice";
import CustomImage from "./CustomImage";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center border-b py-4">
      <CustomImage
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p>{item.price} € x {item.quantity}</p>
        <p className="font-bold">
          Totale: {(item.price * item.quantity).toFixed(2)} €
        </p>
      </div>
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Rimuovi
      </button>
    </div>
  );
};

export default CartItem;
