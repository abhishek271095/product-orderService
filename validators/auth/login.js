let Validator = require("validatorjs");
const languageUtility = require("../../utilities/language.utilities.js");

const validators = {
  login: async (data) => {
    const constants = await languageUtility(data.myLang);
    var response = {
      validate: false,
    };
    var rules = {
      email: "required",
      password: "required",
    };
    let validator = new Validator(data, rules);
    if (validator.fails()) {
      if (validator.errors.first("email")) {
        response.message = constants.EMAIL_REQUIRED;
      } else if (validator.errors.first("password")) {
        response.message = constants.PASSWORD_REQUIRED;
      }
      return response;
    }
    response.validate = true;
    return response;
  },
};

// export module to use it on other files
module.exports = validators;
