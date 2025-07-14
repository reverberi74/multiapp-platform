import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slice/productsSlice";
import CustomImage from "../../components/shared/CustomImage";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">{error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded shadow p-3 flex flex-col"
        >
          <CustomImage
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-contain mb-2"
          />
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">{product.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
