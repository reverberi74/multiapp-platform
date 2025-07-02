import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { SERVER_PRIVATE_KEY } = process.env;

/**
 * Compare user password to database data
 * @param {string} password 
 * @param {string} hash 
 */
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

/**
 * Hash user password
 * @param {string} password 
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};

/**
 * Generate user JWT
 * @param {object} payload
 */
const generateUserToken = (payload) => {
  return jwt.sign(payload, SERVER_PRIVATE_KEY);
};

/**
 * Verify user JWT
 * @param {string} token 
 * @returns 
 */
const verifyUserToken = (token) => {
    //console.log("TOKEN:", token);
  //console.log("KEY:", SERVER_PRIVATE_KEY);
  return jwt.verify(token, SERVER_PRIVATE_KEY);
};

export {
  comparePassword,
  hashPassword,
  generateUserToken,
  verifyUserToken
};
