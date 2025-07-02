import Entity from "../../db/models/Entity.js";
import slugify from "slugify";

/**
 * Crea una nuova Entity
 * @route POST /api/entities
 * @param {Request} req
 * @param {Response} res
 * @returns {Object} 201 - Entity creata
 */
export const createEntity = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Il titolo è obbligatorio." });
    }

    const slug = slugify(title, { lower: true });

    const newEntity = await Entity.create({
      title,
      description,
      image,
      slug,
      createdBy: req.user._id,
    });

    res.status(201).json(newEntity);
  } catch (err) {
    console.error("Errore creazione entity:", err);
    res.status(500).json({ message: "Errore del server." });
  }
};

/**
 * Recupera tutte le Entity
 * @route GET /api/entities
 * @param {Request} req
 * @param {Response} res
 * @returns {Array<Object>} 200 - Lista Entity
 */
export const getEntities = async (req, res) => {
  try {
    const entities = await Entity.find().sort({ createdAt: -1 });
    res.json(entities);
  } catch (err) {
    console.error("Errore recupero entities:", err);
    res.status(500).json({ message: "Errore del server." });
  }
};

/**
 * Recupera una singola Entity
 * @route GET /api/entities/:id
 * @param {Request} req
 * @param {Response} res
 * @returns {Object} 200 - Entity trovata
 */
export const getEntityById = async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ message: "Entity non trovata." });
    }
    res.json(entity);
  } catch (err) {
    console.error("Errore recupero entity:", err);
    res.status(500).json({ message: "Errore del server." });
  }
};

/**
 * Aggiorna un'Entity
 * @route PUT /api/entities/:id
 * @param {Request} req
 * @param {Response} res
 * @returns {Object} 200 - Entity aggiornata
 */
export const updateEntity = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const updatedData = { description, image };

    if (title) {
      updatedData.title = title;
      updatedData.slug = slugify(title, { lower: true });
    }

    const entity = await Entity.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!entity) {
      return res.status(404).json({ message: "Entity non trovata." });
    }

    res.json(entity);
  } catch (err) {
    console.error("Errore aggiornamento entity:", err);
    res.status(500).json({ message: "Errore del server." });
  }
};

/**
 * Elimina un'Entity
 * @route DELETE /api/entities/:id
 * @param {Request} req
 * @param {Response} res
 * @returns {Object} 200 - Messaggio di eliminazione
 */
export const deleteEntity = async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.id);
    if (!entity) {
      return res.status(404).json({ message: "Entity non trovata." });
    }
    res.json({ message: "Entity eliminata." });
  } catch (err) {
    console.error("Errore eliminazione entity:", err);
    res.status(500).json({ message: "Errore del server." });
  }
};

