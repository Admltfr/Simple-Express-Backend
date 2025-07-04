import jwt from "jsonwebtoken";
import BaseError from "../errors/base-error.js";
import db from "../utils/db.js";

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw BaseError.unauthorized("Token not found");
    }

    const token = authHeader.split(" ")[1];

    if (token == null) throw BaseError.unauthorized("User Have Not Login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(BaseError.forbidden("User Not Found"));
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.message === "invalid signature") {
      return next(new BaseError.forbidden("Invalid Signature"));
    } else if (err.message === "invalid token") {
      return next(BaseError.forbidden("Invalid Token"));
    } else if (err.message === "jwt expired") {
      return next(BaseError.forbidden("Token Expired"));
    } else {
      return next(BaseError.forbidden("Token Is Invalid Or No Longer Valid"));
    }
  }
};

export default authToken;
