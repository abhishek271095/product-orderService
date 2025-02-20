/**
 * token middleware file
 */
const languageHelper = require("./../utilities/language.utilities"),
  jwtAuth = require("../utilities/jwt.utilities");
const secretJson = require("../secret.json");
const config = require("../config/config.json")[secretJson.ENVIRONMENT];

const tokenMiddleware = async (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization : "";
  let response = {};
  const constants = await languageHelper(res.locals.language);
  if (token === "") {
    res.statusCode = 403;
    response.error = constants.TOKEN_REQUIRED_ERROR;
    response.errorMessage = constants.TOKEN_VALIDATION;
    return res.json(response);
  } else {
    // get token
    if (token && token.split(" ")[0] === "Bearer") {
      token = token.split(" ")[1];
      const jwtData = await jwtAuth.JWTVerify(token);
      if (jwtData.status === false) {
        res.statusCode = 403;
        response.error = constants.TOKEN_INVALID_ERROR;
        response.errorMessage = constants.TOKEN_EXPIRED;
        return res.json(response);
      }

      if (jwtData.status === true) {
        res.locals.userData = jwtData.verify;
        next();
      } else {
        res.statusCode = 403;
        response.error = constants.PERMISSION_ERROR;
        response.errorMessage = constants.PERMISSION_ERROR_DESCRIPTION;
        return res.json(response);
      }
    }
  }
};

// export data to use in other files
module.exports = tokenMiddleware;
