import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthService } from "../../services/useAuthService";
import { login } from "../../store/slice/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup } = useAuthService();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    try {
      const res = await signup({
        email: form.email,
        password: form.password
      });

      dispatch(login({ user: res.user, token: res.token }));
      navigate("/"); // o dove vuoi reindirizzare
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        setError("Esiste già un account con questa email.");
      } else {
        setError(err.response?.data?.message || "Errore durante la registrazione.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crea un nuovo account</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Conferma Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Signup;
