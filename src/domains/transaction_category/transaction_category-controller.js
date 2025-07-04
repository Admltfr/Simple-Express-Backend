import TransactionCategoryService from "./transaction_category-service.js";
import BaseResponse from "../../utils/base-response.js";

class TransactionCategoryController {
  async create(req, res, next) {
    try {
      const category = await TransactionCategoryService.create(req.body);
      return BaseResponse.created(res, { category }, "Category created");
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await TransactionCategoryService.getAll();
      return BaseResponse.success(res, { categories }, "Fetch categories success");
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await TransactionCategoryService.getById(id);
      return BaseResponse.success(res, { category }, "Fetch category success");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await TransactionCategoryService.update(id, req.body);
      return BaseResponse.success(res, { category }, "Category updated");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await TransactionCategoryService.delete(id);
      return BaseResponse.success(res, { category }, "Category deleted");
    } catch (err) {
      next(err);
    }
  }
}

export default new TransactionCategoryController();