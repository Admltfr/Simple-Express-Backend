import TransactionService from "./transaction-service.js";
import BaseResponse from "../../utils/base-response.js";

class TransactionController {
  async create(req, res, next) {
    try {
      const user_id = req.user.id;
      const trx = await TransactionService.create(user_id, req.body);
      return BaseResponse.created(
        res,
        { transaction: trx },
        "Transaction created"
      );
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const transactions = await TransactionService.getAll();
      return BaseResponse.success(
        res,
        { transactions },
        "Fetch all transactions success"
      );
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const trx = await TransactionService.getById(id, user_id);
      return BaseResponse.success(res, { transaction: trx }, "Fetch transaction success");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const trx = await TransactionService.update(id, user_id, req.body);
      return BaseResponse.success(
        res,
        { transaction: trx },
        "Transaction updated"
      );
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const trx = await TransactionService.delete(id, user_id);
      return BaseResponse.success(
        res,
        { transaction: trx },
        "Transaction deleted"
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionController();
