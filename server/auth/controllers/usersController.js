import Joi from "joi";
import { outError } from "../../utilities/errors.js";
import { User, BusinessProfile } from "../../db/index.js";
import { hashPassword } from "../../utilities/auth.js";

/**
 * Create a new user
 * @param {Request} req 
 * @param {Response} res 
 */
export const createUser = async (req, res) => {
  const role = req.query.role || "user";

  if (role === "mod") return res.status(400).json({ message: "Not Authorized" });

  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    metadata: Joi.object().keys({
      business_name: Joi.string().required(),
      business_address: Joi.object().keys({
        address: Joi.string().required(),
        number: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        cap: Joi.string().required(),
      }),
      business_logo: Joi.string().optional(),
    }).optional(),
    is_active: Joi.boolean().default(true)
  });

  try {
    const data = await schema.validateAsync(req.body);
    data.role = role;
    data.password = hashPassword(data.password);

    const { metadata, ...payload } = data;

    let user = (await new User(payload).save()).toObject();

    if (metadata && role === "business") {
      const profile = await new BusinessProfile({ user: user._id, ...metadata }).save();
      await User.updateOne({ _id: user._id }, { business_profile: profile._id });

      user = await User.findOne({ _id: user._id }, "-password", { lean: true }).populate({
        path: "business_profile",
        select: "-createdAt -updatedAt",
      });
    }

    delete user.password;

    return res.status(201).json(user);
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Update the role of an existing user
 * @param {Request} req 
 * @param {Response} res 
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["user", "business", "mod", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Ruolo non valido." });
    }

    // Solo admin può promuovere a admin
    if (role === "admin" && req.user.role !== "admin") {
      return res.status(403).json({ error: "Solo un admin può creare un altro admin." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Utente non trovato." });
    }

    res.json({
      message: `Ruolo aggiornato in ${role}.`,
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name
      }
    });
  } catch (error) {
    console.log("Ruolo aggiornato correttamente:", updatedUser);
    console.error("Errore aggiornamento ruolo:", error);
    res.status(500).json({ error: "Errore del server." });
  }
};




