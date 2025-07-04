import Joi from "joi";

export const createTransactionSchema = Joi.object({
  category_id: Joi.string().required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  amount: Joi.number().required(),
  description: Joi.string().allow(""),
});

export const updateTransactionSchema = Joi.object({
  category_id: Joi.string(),
  type: Joi.string().valid("INCOME", "EXPENSE"),
  amount: Joi.number(),
  description: Joi.string().allow(""),
}).or("category_id", "type", "amount", "description");
