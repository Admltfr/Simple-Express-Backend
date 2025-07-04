import express from "express";
import TransactionController from "./transaction-controller.js";
import validate from "../../middlewares/request-validator.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "./transaction-schema.js";
import authToken from "../../middlewares/auth-token.js";

class TransactionRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.post(
      "/",
      authToken,
      validate(createTransactionSchema),
      TransactionController.create
    );
    this.router.get("/", authToken, TransactionController.getAll);
    this.router.get("/:id", authToken, TransactionController.getById);
    this.router.patch(
      "/:id",
      authToken,
      validate(updateTransactionSchema),
      TransactionController.update
    );
    this.router.delete("/:id", authToken, TransactionController.delete);
  }
}

export default new TransactionRoutes().router;
