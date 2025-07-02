import statusCodes from "../error/status-codes.js";
import BaseError from "../error/base-error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.errorCode).json({
      success: false,
      errorName: err.errorName,
      message: err.message,
    });
  }
  res.status(statusCodes.INTERNAL_SERVER.code).json({
    success: false,
    errorName: "Internal Server Error",
    message: err.message || statusCodes.INTERNAL_SERVER.message,
  });
};

export default errorHandler;