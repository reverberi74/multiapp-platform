import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { SERVER_PRIVATE_KEY } = process.env;

/**
 * Compare user password (async)
 * @param {string} password 
 * @param {string} hash 
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Hash user password (async)
 * @param {string} password 
 * @returns {Promise<string>}
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); // 10 salt rounds
};

/**
 * Generate user JWT
 * @param {object} payload
 */
const generateUserToken = (payload) => {
  return jwt.sign(payload, SERVER_PRIVATE_KEY, {
    expiresIn: "7d",
    algorithm: "HS256"
  });
};

/**
 * Verify user JWT
 * @param {string} token 
 */
const verifyUserToken = (token) => {
  return jwt.verify(token, SERVER_PRIVATE_KEY);
};

export {
  comparePassword,
  hashPassword,
  generateUserToken,
  verifyUserToken
};
