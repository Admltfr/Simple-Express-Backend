import express from "express";
import errorHandler from "./middlewares/error-handler.js";
import BaseError from "./error/base-error.js";

class ExpressApplication {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.get("/test-base-error", (req, res) => {
      throw BaseError.notFound("Test");
    });
    this.app.use(errorHandler);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default ExpressApplication;
