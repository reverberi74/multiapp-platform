const Profile = () => {
  // Dati mock utente
  const user = {
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
  };

  const handleLogout = () => {
    console.log("Logout eseguito!");
    // In futuro: pulizia Redux e redirect al login
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Profilo utente</h2>

      <div className="border p-4 rounded mb-4">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
