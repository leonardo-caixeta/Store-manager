const { addSale } = require('./schemas');

const validateNewSale = (keysObjectToValidate) => {
  const { error } = addSale.validate(keysObjectToValidate);
  console.log(error);
  const status = error && error.details[0].type === 'any.required'
    ? 'REQUIRED_VALUE' : 'INVALID_VALUE';
  if (error) return { status, message: error.message };
};

module.exports = {
  validateNewSale,
};