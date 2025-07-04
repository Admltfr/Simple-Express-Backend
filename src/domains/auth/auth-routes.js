import express from "express";
import AuthController from "./auth-controller.js";
import validate from "../../middlewares/request-validator.js";
import {
  loginSchema,
  registerSchema,
  getMeSchema,
  patchMeSchema,
  resetPasswordSchema,
} from "./auth-schema.js";
import authToken from "../../middlewares/auth-token.js";

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.get("/users", AuthController.getAll);
    this.router.post("/login", validate(loginSchema), AuthController.login);
    this.router.post(
      "/register",
      validate(registerSchema),
      AuthController.register
    );
    this.router.post(
      "/me",
      authToken,
      validate(getMeSchema),
      AuthController.me
    );
    this.router.patch(
      "/me",
      authToken,
      validate(patchMeSchema),
      AuthController.update
    );
    this.router.delete("/me", authToken, AuthController.delete);
    this.router.patch(
      "/reset-password",
      authToken,
      validate(resetPasswordSchema),
      AuthController.resetPassword
    );
  }
}

export default new AuthRoutes().router;
