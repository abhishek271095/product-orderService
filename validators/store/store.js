let Validator = require("validatorjs");
const languageUtility = require("../../utilities/language.utilities");

const validators = {
  create: async (data) => {
    const constants = await languageUtility(data.myLang);
    var response = {
      validate: false,
    };
    var rules = {
      name: "required",
      location: "required",
    };
    var validator = new Validator(data, rules);
    if (validator.fails()) {
      if (validator.errors.first("name")) {
        response.message = validator.errors.first("name");
      }
      if (validator.errors.first("location")) {
        response.message = validator.errors.first("location");
      }
      return response;
    }
    response.validate = true;
    return response;
  },
};

module.exports = validators;
