const { dbConnection } = require("../config/db");
const user = require("../models/user");

const userService = {
  create: async (data) => {
    try {
      await dbConnection();
      let result = user.create(data);
      return result;
    } catch (error) {
      console.log("DB:error user create Failed.", error);
      return false;
    }
  },

  getOne: async (data) => {
    console.log("*******data", data);
    try {
      await dbConnection();
      let result = await user
        .findOne(data)
        .select({ name: 1, email: 1, password: 1, status: 1, _id: 1 })
        .exec();
      console.log("*******result", result);
      return result;
    } catch (error) {
      console.log("DB:error order getOne Failed.", error);
      return false;
    }
  },
};

module.exports = userService;
