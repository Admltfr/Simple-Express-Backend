import express from "express";
import TransactionCategoryController from "./transaction_category-controller.js";
import validate from "../../middlewares/request-validator.js";
import { createTransactionCategorySchema, updateTransactionCategorySchema } from "./transaction_category-schema.js";
import authToken from "../../middlewares/auth-token.js";

class TransactionCategoryRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.post(
      "/",
      authToken,
      validate(createTransactionCategorySchema),
      TransactionCategoryController.create
    );
    this.router.get("/", authToken, TransactionCategoryController.getAll);
    this.router.get("/:id", authToken, TransactionCategoryController.getById);
    this.router.patch(
      "/:id",
      authToken,
      validate(updateTransactionCategorySchema),
      TransactionCategoryController.update
    );
    this.router.delete("/:id", authToken, TransactionCategoryController.delete);
  }
}

export default new TransactionCategoryRoutes().router;