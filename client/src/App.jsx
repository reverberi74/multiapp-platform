import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";

// Pagine pubbliche
import Home from "./pages/public/Home";
import Catalog from "./pages/public/Catalog";
import ProductDetail from "./pages/public/ProductDetail";
import Cart from "./pages/public/Cart";
import Checkout from "./pages/public/Checkout";

// Pagine private
import Orders from "./pages/private/Orders";
import Profile from "./pages/private/Profile";

// Pagine auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const App = () => {
  const isAuthenticated = true; // ⚠️ In seguito sostituirai con Redux o context

  return (
      <Routes>
        {/* Rotte pubbliche */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Rotte private */}
        <Route element={<PrivateLayout />}>
          <Route path="/orders" element={isAuthenticated ? <Orders /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        </Route>

        {/* Rotta Not Found */}
        <Route path="*" element={<h1>404 - Pagina non trovata</h1>} />
      </Routes>
  );
};

export default App;
