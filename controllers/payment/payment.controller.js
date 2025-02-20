var mongo = require("mongodb");
const paymentService = require("../../services/payment.service");
const orderService = require("../../services/order.service");
const validators = require("../../validators/payment/payment");
const languageHelper = require("../../utilities/language.utilities");

const payment = {
  create: async (req, res) => {
    const myLang = res.locals.language;
    const constants = await languageHelper(res.locals.language);
    let userInfo = res.locals.userData;
    let { orderId, paymentMethod } = req.body;
    let response = {};
    try {
      let data = {
        orderId,
        paymentMethod,
        myLang,
      };
      let validatorResult = await validators.create(data);
      if (!validatorResult.validate) {
        res.statusCode = constants.VALIDATION_STATUS_CODE;
        response.error = constants.VALIDATION_TYPE_ERROR;
        response.errorMessage = validatorResult.message;
        return res.json(response);
      }
      let checkOrder = await orderService.checkById(orderId);
      if (!checkOrder) {
        response.error = constants.NOT_FOUND_ERROR;
        response.errorMessage = constants.NOT_FOUND_ERROR;
        res.statusCode = constants.NOT_FOUND_STATUS_CODE;
        return res.json(response);
      }
      let amount = checkOrder.totalAmount;
      let randomNumber = Math.floor(Math.random() * 500 + 1);
      let insertData = {
        customerId: userInfo.id,
        orderId: checkOrder._id,
        paymentMethod: paymentMethod,
        amount: amount,
        status: "Completed",
        transactionId: randomNumber,
      };
      let result = await paymentService.create(insertData);

      let orderUpdateEntity = {
        status: "Completed",
        updatedAt: new Date(),
      };
      await orderService.update(orderUpdateEntity, checkOrder._id);

      response.message = constants.SUCCESS;
      response.id = result._id;
      response.statusCode = constants.SUCCESS_STATUS_CODE;
      return res.json(response);
    } catch (err) {
      console.log("error", "try-catch: payment create query failed.", err);
      res.statusCode = constants.SOMETHING_WENT_WRONG_STATUS_CODE;
      return res.json(response);
    }
  },
};
module.exports = payment;
