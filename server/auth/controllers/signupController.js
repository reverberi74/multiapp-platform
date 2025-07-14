import Joi from "joi";
import { User } from "../../db/index.js";
import { hashPassword, generateUserToken } from "../../utilities/auth.js";
import { outError } from "../../utilities/errors.js";

export const signup = async (req, res) => {
  // Regex di password enterprise
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).required()
      .messages({
        "string.pattern.base": "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un simbolo."
      }),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional()
  });

  try {
    // 1️⃣ Validazione input
    const data = await schema.validateAsync(req.body);

    // 2️⃣ Verifica email già esistente
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(409).json({ message: "Questa email è già registrata." });
    }

    // 3️⃣ Hash password
    const hashedPassword = await hashPassword(data.password);

    // 4️⃣ Creazione utente
    const user = await User.create({
      email: data.email,
      password: hashedPassword,
      first_name: data.first_name,
      last_name: data.last_name,
      role: "user",
      is_active: true
    });

    // 5️⃣ Genera token
    const token = generateUserToken({ _id: user._id, role: user.role });

    // 6️⃣ Rimuovi password dal payload
    const userObj = user.toObject();
    delete userObj.password;

    // 7️⃣ Risposta
    return res.status(201).json({
      token,
      user: userObj
    });

  } catch (err) {
    outError(res, err);
  }
};
