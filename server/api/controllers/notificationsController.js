import Notification from "../../db/models/Notification.js";

// Crea notifica
export const createNotification = async (req, res) => {
    try {
        const { message, user } = req.body;

        const notification = new Notification({
            message,
            user,
        });

        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Errore creazione notifica", error: error.message });
    }
};

// Recupera notifiche dell'utente autenticato
export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Errore recupero notifiche", error: error.message });
    }
};

// Marca come letta
export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notifica non trovata" });
        }

        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Errore aggiornamento notifica", error: error.message });
    }
};

// Elimina notifica
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!notification) {
            return res.status(404).json({ message: "Notifica non trovata" });
        }

        res.json({ message: "Notifica eliminata" });
    } catch (error) {
        res.status(500).json({ message: "Errore eliminazione notifica", error: error.message });
    }
};
