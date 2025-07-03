import db from "../../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BaseError from "../../errors/base-error.js";
import logger from "../../utils/logger.js";

class AuthService {
  async login(email, password) {
    logger.info(`DB: findUnique user by email: ${email}`);
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn(`Login failed: user not found for email ${email}`);
      throw BaseError.notFound("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: invalid password for email ${email}`);
      throw BaseError.unauthorized("Invalid password");
    }

    logger.info(`Login success for user: ${email}`);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async register({ name, email, password }) {
    logger.info(`DB: findUnique user by email: ${email}`);
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      logger.warn(`Register failed: email already registered (${email})`);
      throw BaseError.badRequest("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    logger.info(`DB: create user: ${email}`);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    logger.info(`Register success for user: ${email}`);
    return user;
  }
}

export default new AuthService();
