import Joi from "joi";
import { User } from "../../db/index.js";
import { comparePassword, generateUserToken } from "../../utilities/auth.js";
import { outError } from "../../utilities/errors.js";

const login = async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().optional().valid("user", "mod", "admin", "business").default("user"),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const user = await User.findOne({ email: data.email, role: data.role, is_active: true }, null, { lean: true });

        if (user == null) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!comparePassword(data.password, user.password)) {
            return res.status(400).json({ message: "User not found" });
        }

        const token = generateUserToken({ _id: user._id, role: user.role });

        delete user.password;

        return res.status(200).json({ token, user });
    } catch(err) {
        outError(res, err);
    }
};

export default login;