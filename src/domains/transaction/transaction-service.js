import db from "../../utils/db.js";
import BaseError from "../../errors/base-error.js";
import logger from "../../utils/logger.js";

class TransactionService {
  async create(user_id, { category_id, type, amount, description }) {
    logger.info(`DB: create transaction for user: ${user_id}`);

    return db.transaction.create({
      data: { user_id, category_id, type, amount, description },
      include: { category: true },
    });
  }

  async getAll() {
    logger.info("DB: get all transactions (admin)");
    return db.transaction.findMany({
      include: { category: true, user: true },
    });
  }

  async getById(id, user_id) {
    logger.info(`DB: get transaction by id: ${id} for user: ${user_id}`);
    const trx = await db.transaction.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!trx || trx.user_id !== user_id)
      throw BaseError.notFound("Transaction not found");
    return trx;
  }

  async update(id, user_id, { category_id, type, amount, description }) {
    logger.info(`DB: update transaction by id: ${id}`);
    const trx = await db.transaction.findUnique({ where: { id } });

    if (!trx || trx.user_id !== user_id)
      throw BaseError.notFound("Transaction not found");

    const data = {};
    if (category_id) data.category_id = category_id;
    if (type) data.type = type;
    if (amount !== undefined) data.amount = amount;
    if (description !== undefined) data.description = description;

    return db.transaction.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async delete(id, user_id) {
    logger.info(`DB: delete transaction by id: ${id}`);
    const trx = await db.transaction.findUnique({ where: { id } });

    if (!trx || trx.user_id !== user_id)
      throw BaseError.notFound("Transaction not found");
    return db.transaction.delete({ where: { id } });
  }
}

export default new TransactionService();
