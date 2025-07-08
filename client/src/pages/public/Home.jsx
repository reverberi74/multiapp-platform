import { useSelector } from "react-redux";
import ProductCard from "../../components/shared/ProductCard";

const Home = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
