export function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    // Se non c'è utente autenticato
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Non autenticato." });
    }

    // Se il ruolo non è tra quelli ammessi
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accesso negato. Permessi insufficienti." });
    }

    // Ruolo valido, avanti
    next();
  };
}
