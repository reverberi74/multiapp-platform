import Joi from "joi";
import { User } from "../../db/index.js";
import { comparePassword, generateUserToken } from "../../utilities/auth.js";
import { outError } from "../../utilities/errors.js";

const login = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().optional().valid("user", "mod", "admin", "business")
  });

  try {
    const data = await schema.validateAsync(req.body);

    const query = {
      email: data.email,
      is_active: true
    };
    if (data.role) {
      query.role = data.role;
    }

    const user = await User.findOne(query, null, { lean: true });

    if (!user) {
      console.log(`Login fallito: utente non trovato per ${data.email}`);
      return res.status(400).json({ message: "Credenziali non valide." });
    }

    if (!comparePassword(data.password, user.password)) {
      console.log(`Login fallito: password errata per ${data.email}`);
      return res.status(400).json({ message: "Credenziali non valide." });
    }

    const token = generateUserToken({ _id: user._id, role: user.role });

    delete user.password;

    return res.status(200).json({ token, user });
  } catch (err) {
    outError(res, err);
  }
};

export default login;
