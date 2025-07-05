import Order from "../../db/models/Order.js";
import Cart from "../../db/models/Cart.js";


// Crea ordine dal carrello
export const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Carrello vuoto" });
        }

        const order = await Order.create({
            user: req.user._id,
            products: cart.products.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        });

        // Svuota il carrello dopo la creazione ordine
        cart.products = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Recupera ordini dell'utente autenticato
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Aggiorna stato ordine
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Ordine non trovato" });
        }

        order.products.forEach((p) => {
            p.status = status;
        });

        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Elimina ordine (opzionale)
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Ordine non trovato" });
        }

        res.json({ message: "Ordine eliminato" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Conferma pagamento ordine
export const payOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Ordine non trovato" });
        }

        // Verifica che l'ordine appartenga all'utente
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Non autorizzato" });
        }

        // Segna come pagato
        order.paid = true;

        // Aggiorna stato prodotti a "completed"
        order.products.forEach((item) => {
            item.status = "completed";
        });

        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Errore pagamento ordine:", error);
        res.status(500).json({ message: "Errore server" });
    }
};
