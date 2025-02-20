let Validator = require("validatorjs");
const languageUtility = require("../../utilities/language.utilities");

const validators = {
  create: async (data) => {
    const constants = await languageUtility(data.myLang);
    var response = {
      validate: false,
    };

    var rules = {
      storeId: "required",
      productName: "required",
      quantity: "required",
      price: "required",
    };
    var validator = new Validator(data, rules);
    if (validator.fails()) {
      if (validator.errors.first("storeId")) {
        response.message = validator.errors.first("storeId");
      }
      if (validator.errors.first("productName")) {
        response.message = validator.errors.first("productName");
      }
      if (validator.errors.first("quantity")) {
        response.message = validator.errors.first("quantity");
      }
      if (validator.errors.first("price")) {
        response.message = validator.errors.first("price");
      }
      return response;
    }
    response.validate = true;
    return response;
  },
};

module.exports = validators;
