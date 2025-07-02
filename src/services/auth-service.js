import db from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BaseError from "../errors/base-error.js";

class AuthService {
  async login(email, password) {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw BaseError.notFound("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw BaseError.unauthorized("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async register({ name, email, password }) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      throw BaseError.badRequest("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}

export default new AuthService();
