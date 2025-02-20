const { dbConnection } = require("../config/db");
const order = require("../models/order");

const orderService = {
  create: async (data) => {
    try {
      await dbConnection();
      let result = order.create(data);
      return result;
    } catch (error) {
      console.log("DB:error order create Failed.", error);
      return false;
    }
  },

  checkById: async (data) => {
    try {
      await dbConnection();
      let result = await order.findById(data).exec();
      console.log("*******result", result);
      return result;
    } catch (error) {
      console.log("DB:error Failed.", error);
      return false;
    }
  },

  list: async (data) => {
    console.log("=====>data", data);
    try {
      await dbConnection();
      let result = await order
        .find(data.where)
        .select({
          _id: 1,
          customerId: 1,
          products: 1,
          totalAmount: 1,
          status: 1,
          createdAt: 1,
        })
        .populate("customerId")
        .limit(data.limit)
        .skip(data.offset)
        .sort(data.sorting);
      console.log("=====>results", result);
      return result.length > 0 ? result : false;
    } catch (error) {
      console.log(
        "DB:error get subscription info in payment service query Failed.",
        error
      );
      return false;
    }
  },

  getOne: async (data) => {
    try {
      await dbConnection();
      let result = await order
        .findOne(data)
        .select({
          _id: 1,
          customerId: 1,
          products: 1,
          totalAmount: 1,
          status: 1,
          createdAt: 1,
        })
        .exec();
      console.log("*******result", result);
      return result;
    } catch (error) {
      console.log("DB:error order getOne Failed.", error);
      return false;
    }
  },

  update: async (data, orderId) => {
    return await order
      .findByIdAndUpdate(orderId, data)
      .then(async (updateResult) => {
        console.log("updateResult", updateResult);
        return updateResult;
      })
      .catch(async (err) => {
        console.log("error", "DB error: update query failed.", err);
        return false;
      });
  },
};

module.exports = orderService;
