/**
 * Gestisce l'upload di un singolo file.
 * Restituisce nome e percorso del file.
 */
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nessun file ricevuto." });
  }

  res.status(201).json({
    message: "File caricato con successo.",
    filename: req.file.filename
  });
};
