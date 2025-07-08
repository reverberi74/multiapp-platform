const Orders = () => {
  // Dati mock di ordini
  const orders = [
    {
      id: "ORD-001",
      date: "2024-07-01",
      total: 120.5,
      status: "In elaborazione",
    },
    {
      id: "ORD-002",
      date: "2024-07-03",
      total: 250,
      status: "Spedito",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">I tuoi ordini</h2>

      {orders.length === 0 ? (
        <p>Non hai ancora effettuato ordini.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Ordine: {order.id}</p>
                <p>Data: {order.date}</p>
                <p>Totale: {order.total.toFixed(2)} €</p>
              </div>
              <span className="text-sm px-2 py-1 bg-blue-200 rounded">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
