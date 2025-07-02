import jwt from "jsonwebtoken";
import BaseError from "../errors/base-error.js";

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw BaseError.unauthorized("Token not found");
    }

    const token = authHeader.split(" ")[1];

    if (token == null) throw new BaseError.unauthorized("User Have Not Login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new BaseError.forbidden("User Not Found"));
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(BaseError.unauthorized("Token expired or invalid"));
    } else {
      return next(
        new BaseError(
          500,
          "Internal Server Error",
          "INTERNAL_SERVER_ERROR",
          err.message || "An error occurred while processing the token"
        )
      );
    }
  }
};

export default authToken;
