const { dbConnection } = require("../config/db");
const payment = require("../models/payment");

const paymentService = {
  create: async (data) => {
    try {
      await dbConnection();
      let result = payment.create(data);
      return result;
    } catch (error) {
      console.log("DB:error payment create Failed.", error);
      return false;
    }
  },
};

module.exports = paymentService;
