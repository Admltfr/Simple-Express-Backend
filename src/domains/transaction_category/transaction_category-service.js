import db from "../../utils/db.js";
import BaseError from "../../errors/base-error.js";
import logger from "../../utils/logger.js";

class TransactionCategoryService {
  async create({ name, description }) {
    logger.info(`DB: create transaction category: ${name}`);
    return db.transactionCategory.create({
      data: { name, description },
    });
  }

  async getAll() {
    logger.info("DB: get all transaction categories");
    return db.transactionCategory.findMany();
  }

  async getById(id) {
    logger.info(`DB: get transaction category by id: ${id}`);
    const category = await db.transactionCategory.findUnique({ where: { id } });
    
    if (!category) throw BaseError.notFound("Category not found");
    return category;
  }

  async update(id, { name, description }) {
    logger.info(`DB: update transaction category by id: ${id}`);
    const category = await db.transactionCategory.findUnique({ where: { id } });

    if (!category) throw BaseError.notFound("Category not found");

    const data = {};
    if (name) data.name = name;
    if (description) data.description = description;

    return db.transactionCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    logger.info(`DB: delete transaction category by id: ${id}`);
    const category = await db.transactionCategory.findUnique({ where: { id } });

    if (!category) throw BaseError.notFound("Category not found");

    return db.transactionCategory.delete({ where: { id } });
  }
}

export default new TransactionCategoryService();