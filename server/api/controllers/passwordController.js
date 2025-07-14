// server/api/controllers/passwordController.js

import Joi from "joi";
import { User } from "../../db/index.js";
import { outError } from "../../utilities/errors.js";
import { comparePassword, hashPassword } from "../../utilities/auth.js";

/**
 * Change user password
 * @param {Request} req
 * @param {Response} res
 */
export const changePassword = async (req, res) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  });

  try {
    const { oldPassword, newPassword } = await schema.validateAsync(req.body);

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!comparePassword(oldPassword, user.password)) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = await hashPassword(newPassword); // ✅ AGGIUNTO await
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    outError(res, err);
  }
};
