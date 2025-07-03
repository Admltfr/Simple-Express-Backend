import express from "express";
import AuthController from "./auth-controller.js";
import validate from "../../middlewares/request-validator.js";
import { loginSchema, registerSchema } from "./auth-schema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/register", validate(registerSchema), AuthController.register);

export default router;
