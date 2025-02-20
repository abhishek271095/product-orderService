var mongo = require("mongodb");
const storeService = require("../services/store.service");
const validators = require("../validators/store/store");
const languageHelper = require("../utilities/language.utilities");

const store = {
  create: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let { name, location } = req.body;
    let response = {};
    try {
      let data = {
        name,
        location,
        myLang,
      };
      let validatorResult = await validators.create(data);
      if (!validatorResult.validate) {
        res.statusCode = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response);
      }
      let insertData = {
        name: name,
        location: location,
      };
      let result = await storeService.create(insertData);

      console.log("-----result", result);

      response.message = constants.SUCCESS;
      response.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: contents created query failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },

  list: async (req, res) => {
    let myLang = res.locals.language;
    let constants = await languageHelper(res.locals.language);
    let response = {};
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let offset = req.query.offset ? parseInt(req.query.offset) : 0;
    let search = req.query.search ? req.query.search : "";
    let status = req.query.status ? req.query.status : "";
    let type = req.query.type ? req.query.type : "";
    let orderBy = req.query.orderBy ? req.query.orderBy : "createdAt";
    let orderType = parseInt(req.query.orderType)
      ? parseInt(req.query.orderType)
      : 1;
    try {
      let sorting = { [orderBy]: orderType };
      let where = {
        deletedAt: null,
      };
      let checkEntity = {
        search,
        limit,
        offset,
        where,
        sorting,
      };
      let result = await storeService.list(checkEntity);

      if (!result) {
        response.message = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.result = result;
      // set the cache
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: contentsList controller failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },

  orderDetail: async (req, res) => {
    let myLang = res.locals.language;
    let constants = await languageHelper(res.locals.language);
    let response = {};
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let offset = req.query.offset ? parseInt(req.query.offset) : 0;
    let search = req.query.search ? req.query.search : "";
    let status = req.query.status ? req.query.status : "";
    let type = req.query.type ? req.query.type : "";
    let orderBy = req.query.orderBy ? req.query.orderBy : "createdAt";
    let orderType = parseInt(req.query.orderType)
      ? parseInt(req.query.orderType)
      : 1;
    try {
      let sorting = { [orderBy]: orderType };
      let where = {
        deletedAt: null,
      };
      let checkEntity = {
        search,
        limit,
        offset,
        where,
        sorting,
      };
      let result = await storeService.list(checkEntity);

      if (!result) {
        response.message = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.result = result;
      // set the cache
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: contentsList controller failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },
};
module.exports = store;
