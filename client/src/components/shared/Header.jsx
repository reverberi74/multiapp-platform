import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Mini Amazon</Link>
        </h1>
        <nav className="flex items-center gap-4">
          <Link to="/catalog" className="hover:underline">
            Catalogo
          </Link>
          <Link to="/cart" className="relative">
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-xs">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

