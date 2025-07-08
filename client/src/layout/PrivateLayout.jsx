import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const PrivateLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
