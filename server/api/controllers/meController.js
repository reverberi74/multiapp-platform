// server/api/controllers/meController.js

import Joi from "joi";
import { User } from "../../db/index.js";
import { outError } from "../../utilities/errors.js";

/**
 * Get current user information
 * @param {Request} req
 * @param {Response} res
 */
const getMeInfo = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

/**
 * Update current user profile
 * @param {Request} req
 * @param {Response} res
 */
const updateMe = async (req, res) => {
  // Validazione campi aggiornabili
  const schema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    cap: Joi.string().optional(),
    city: Joi.string().optional(),
    province: Joi.string().optional(),
    dateBirth: Joi.date().optional(),
    fiscalCode: Joi.string().optional()
  });

  try {
    const data = await schema.validateAsync(req.body);

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $set: data },
      { new: true, runValidators: true, lean: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    delete updated.password;

    return res.status(200).json(updated);
  } catch (err) {
    outError(res, err);
  }
};

export { getMeInfo, updateMe };
