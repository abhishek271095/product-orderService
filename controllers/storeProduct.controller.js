const storeProductService = require("../services/storeProduct.service");
const validators = require("../validators/product/product");
const languageHelper = require("../utilities/language.utilities");
const product = {
  create: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let { storeId, productName, quantity, price } = req.body;
    let response = {};
    try {
      let data = {
        storeId,
        productName,
        quantity,
        price,
        myLang,
      };
      let validatorResult = await validators.create(data);
      if (!validatorResult.validate) {
        res.statusCode = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response);
      }
      // let checkEntity = {
      //   storeId: storeId,
      //   productId: question,
      //   deletedAt: null,
      // };
      // let checkProduct = await productService.getOne(checkEntity);

      let insertData = {
        storeId: storeId,
        productName: productName,
        quantity: quantity,
        price: parseInt(price),
      };
      let result = await storeProductService.create(insertData);
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
    let orderBy = req.query.orderBy ? req.query.orderBy : "createdAt";
    let orderType = parseInt(req.query.orderType)
      ? parseInt(req.query.orderType)
      : 1;
    try {
      let where = {
        deletedAt: null,
      };
      let sorting = { [orderBy]: orderType };
      let checkEntity = {
        where,
        search,
        limit,
        offset,
        sorting,
      };

      let result = await storeProductService.list(checkEntity);
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
module.exports = product;
