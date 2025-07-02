/*import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Esercitazione Fullstack</h1>

      <Routes>
        <Route path="/" element={<h2>🏠 Home Page</h2>} />
        <Route path="/about" element={<h2>ℹ️ About Page</h2>} />
      </Routes>
    </div>
  );
}

export default App;*/

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Tailwind ✅</h1>
        <p className="text-gray-600">Se vedi questo box bello stilizzato, Tailwind funziona! 😎</p>
      </div>
    </div>
  );
}

export default App;
