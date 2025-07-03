import express from "express";
import AuthController from "./auth-controller.js";
import validate from "../../middlewares/request-validator.js";
import { loginSchema, registerSchema } from "./auth-schema.js";

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.post("/login", validate(loginSchema), AuthController.login);
    this.router.post(
      "/register",
      validate(registerSchema),
      AuthController.register
    );
  }
}

export default new AuthRoutes().router;
