import express from "express";
import morgan from "morgan";
import errorHandler from "./errors/error-handler.js";
import BaseError from "./errors/base-error.js";

// Api Routes
import authRoutes from "./domains/auth/auth-routes.js";
import transactionRoutes from "./domains/transaction/transaction-routes.js";
import transactionCategoryRoutes from "./domains/transaction_category/transaction_category-routes.js";

class ExpressApplication {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("tiny"));
  }

  setupRoutes() {
    this.app.use("/api/v1/auth", authRoutes);
    this.app.use("/api/v1/transactions", transactionRoutes);
    this.app.use("/api/v1/categories", transactionCategoryRoutes);

    // Handle Routes Not Found
    this.app.use("/*splat", (req, res, next) => {
      next(BaseError.notFound("Route not found"));
    });
  }

  setupErrorHandler() {
    this.app.use(errorHandler);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default ExpressApplication;
