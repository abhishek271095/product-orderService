const bcrypt = require("bcryptjs");
var mongo = require("mongodb");
const userService = require("../../services/user.service");
const validators = require("../../validators/auth/login");
const languageHelper = require("../../utilities/language.utilities");
const jwtUtility = require("../../utilities/jwt.utilities.js");
const secretJson = require("../../secret.json");
const config = require("../../config/config.json")[secretJson.ENVIRONMENT];
const user = {
  create: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let { name, email, password } = req.body;
    let response = {};
    try {
      let checkEntity = {
        email: email,
        deletedAt: null,
      };
      let checkAlready = await userService.checkUser(checkEntity);
      if (checkAlready) {
        response.message = constants.ALREADY_EXIST;
        res.statusCode = constants.ALREADY_EXIST_STATUS_CODE;
        return res.json(response);
      }
      if (password) {
        password = bcrypt.hashSync(password, parseInt(10));
      }
      let insertData = {
        name: name,
        email: email,
        password: password,
      };

      console.log("-----insertData", insertData);
      let result = await userService.create(insertData);

      console.log("-----result", result);

      response.message = constants.SUCCESS;
      response.id = result._id;
      response.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: contents created query failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },

  login: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let { email, password } = req.body;
    let userInfo = {};
    let response = {};
    try {
      let data = {
        email,
        password,
        myLang,
      };
      let validatorResult = await validators.login(data);
      if (!validatorResult.validate) {
        res.statusCode = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response);
      }

      let queryWhere = {
        email: email,
        deletedAt: null,
      };
      const userInfoData = await userService.getOne(queryWhere);
      if (!userInfoData) {
        console.log("error user verify failed at insert user.");
        response.error = constants.USER_ID_NOT_EXIST;
        response.errorMessage = constants.USER_ID_NOT_EXIST;
        res.statusCode = constants.UNAUTHORIZED_CODE;
        return res.json(response);
      }

      if (userInfoData.status == "inactive") {
        res.statusCode = constants.UNAUTHORIZED_CODE;
        response.error = constants.INACTIVE_USER_ERROR;
        response.errorMessage = constants.INACTIVE_USER;
        return res.json(response);
      }

      const passwordMatch = await bcrypt.compare(
        password,
        userInfoData.password
      );
      console.log("============passwordMatch", passwordMatch);
      if (!passwordMatch) {
        response.error = constants.WRONG_CREDENTIALS_TYPE;
        response.errorMessage = constants.WRONG_PASSWORD;
        res.statusCode = constants.UNAUTHORIZED_CODE;
        return res.json(response);
      }

      const accessToken = {
        id: userInfoData._id,
        name: userInfoData.name,
        email: userInfoData.email,
        type: "Bearer",
      };

      console.log("============accessTokenEntity", accessToken);
      let accessTokenInfo = await jwtUtility.JWTSighing(
        accessToken,
        config.BEARER_TOKEN_EXPIRY_IN
      );
      console.log("============accessTokenInfo", accessTokenInfo);
      // find or update into device collection
      userInfo._id = userInfoData._id;
      userInfo.name = userInfoData.name;
      userInfo.accessToken = accessTokenInfo.token;
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json({
        result: userInfo,
        message: constants.Success,
      });
    } catch (error) {
      console.log("error user login Failed.", error);
      response.error = constants.SOMETHING_WENT_WRONG_TYPE;
      response.errorMessage = constants.SOMETHING_WENT_WRONG;
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },
};
module.exports = user;
