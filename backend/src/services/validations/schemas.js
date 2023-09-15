const Joi = require('joi');

const addProduct = Joi.object({
  name: Joi.string()
  .min(5)
  .required(),
});

const addSale = Joi.array().items(Joi.object(
  {
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  },
)).messages({
  'any.required': '"{#key}" is required',
  'number.min': '"{#key}"must be greater than or equal to 1',
});

module.exports = {
  addProduct,
  addSale,
};