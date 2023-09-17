const { addSale } = require('./schemas');

const validateNewSale = (keysObjectToValidate) => {
  const { error } = addSale.validate(keysObjectToValidate);
  console.log(error);
  if (error) return { status: 'REQUIRED_VALUE', message: error.message };
};

module.exports = {
  validateNewSale,
};