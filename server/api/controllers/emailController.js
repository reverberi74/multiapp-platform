// server/api/controllers/emailController.js

import Joi from "joi";
import { User } from "../../db/index.js";
import { outError } from "../../utilities/errors.js";

/**
 * Change user email
 * @param {Request} req
 * @param {Response} res
 */
export const changeEmail = async (req, res) => {
  const schema = Joi.object({
    newEmail: Joi.string().email().required()
  });

  try {
    const { newEmail } = await schema.validateAsync(req.body);

    // Controlla che la nuova email non sia già in uso
    const existing = await User.findOne({ email: newEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { email: newEmail, email_verified: false },
      { new: true, lean: true }
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
