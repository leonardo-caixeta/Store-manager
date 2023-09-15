const { addProduct } = require('./schemas');

const validateNewProduct = (keysObjectToValidate) => {
  const { error } = addProduct.validate(keysObjectToValidate);
  console.log(error.type);
  const status = error && error.details[0].type === 'any.required'
    ? 'REQUIRED_VALUE' : 'INVALID_VALUE';
  if (error) return { status, message: error.message };
};

module.exports = {
  validateNewProduct,
};