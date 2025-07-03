import statusCodes from "../errors/status-codes.js";
import BaseError from "../errors/base-error.js";

class BaseResponse {
  static success(res, data, message = "Success") {
    return res.status(statusCodes.OK.code).json({
      success: true,
      status: "OK",
      message,
      data,
    });
  }

  static created(res, data, message = "Created") {
    return res.status(statusCodes.CREATED.code).json({
      success: true,
      status: "Created",
      message,
      data,
    });
  }
}

export default BaseResponse;
