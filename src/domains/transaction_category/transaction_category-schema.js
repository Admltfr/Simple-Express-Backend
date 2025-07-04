import Joi from "joi";

export const createTransactionCategorySchema = Joi.object({
  name: Joi.string().required().min(2).messages({
    "string.empty": "Category name is required.",
    "string.min": "Category name must be at least 2 characters.",
  }),
  description: Joi.string().allow(""),
});

export const updateTransactionCategorySchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.min": "Category name must be at least 2 characters.",
  }),
  description: Joi.string().allow(""),
}).or("name", "description");