var mongo = require("mongodb");
const orderService = require("../services/order.service");
const storeProductService = require("../services/storeProduct.service");
const validators = require("../validators/order/order");
const languageHelper = require("../utilities/language.utilities");

const order = {
  create: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let userInfo = res.locals.userData;

    let { productId, quantity } = req.body;
    let response = {};
    try {
      let data = {
        productId,
        quantity,
        myLang,
      };
      let validatorResult = await validators.create(data);
      if (!validatorResult.validate) {
        res.statusCode = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response);
      }

      let checkProduct = await storeProductService.getOne(productId);
      if (!checkProduct) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.NOT_FOUND_ERROR;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      let productEntity = {
        productId: productId,
        quantity: parseInt(quantity),
      };
      let amount = checkProduct.price * quantity;
      let insertData = {
        customerId: userInfo.id,
        products: productEntity,
        totalAmount: parseInt(amount),
      };
      let result = await orderService.create(insertData);
      response.message = constants.SUCCESS;
      response.id = result._id;
      response.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: order create query failed.", err);
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
      let checkEntity = {
        search,
        limit,
        offset,
        sorting,
      };
      let result = await orderService.list(checkEntity);

      if (!result) {
        response.message = constants.RECORD_NOT_FOUND;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      res.statusCode = constants.SUCCESS_STATUS_CODE;
      response.result = result;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: orderList controller failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },

  detail: async (req, res) => {
    let myLang = res.locals.language;
    let constants = await languageHelper(res.locals.language);
    const orderId = req.params.id;
    let response = {};
    try {
      let checkEntity = {
        _id: orderId,
        deletedAt: null,
      };
      let result = await orderService.getOne(checkEntity);

      response.message = constants.SUCCESS;
      response.statusCode = constants.SUCCESS_STATUS_CODE;
      response.result = result;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: contents created query failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },
};
module.exports = order;
