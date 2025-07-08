import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";
import CustomImage from "./CustomImage";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <CustomImage
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.price} €</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Aggiungi al carrello
      </button>
    </div>
  );
};

export default ProductCard;

