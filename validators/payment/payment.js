let Validator = require("validatorjs");
const languageUtility = require("../../utilities/language.utilities");

const validators = {
  create: async (data) => {
    const constants = await languageUtility(data.myLang);
    var response = {
      validate: false,
    };
    var rules = {
      orderId: "required",
      paymentMethod: [
        "required",
        {
          in: ["Credit Card", "Debit Card", "PayPal", "Cash"],
        },
      ],
    };
    var validator = new Validator(data, rules);
    if (validator.fails()) {
      if (validator.errors.first("orderId")) {
        response.message = validator.errors.first("orderId");
      }
      if (validator.errors.first("paymentMethod")) {
        response.message = validator.errors.first("paymentMethod");
      }
      return response;
    }
    response.validate = true;
    return response;
  },
};

module.exports = validators;
