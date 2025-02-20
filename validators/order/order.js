let Validator = require("validatorjs");
const languageUtility = require("../../utilities/language.utilities");

const validators = {
  create: async (data) => {
    const constants = await languageUtility(data.myLang);
    var response = {
      validate: false,
    };
    var rules = {
      productId: "required",
      quantity: "required",
    };
    var validator = new Validator(data, rules);
    if (validator.fails()) {
      if (validator.errors.first("productId")) {
        response.message = validator.errors.first("productId");
      }
      if (validator.errors.first("quantity")) {
        response.message = validator.errors.first("quantity");
      }
      return response;
    }
    response.validate = true;
    return response;
  },
};

module.exports = validators;
