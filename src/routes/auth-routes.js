import express from "express";
import AuthController from "../controllers/auth-controller.js";
import validate from "../middlewares/request-validator.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/register", validate(registerSchema), AuthController.register);

export default router;
