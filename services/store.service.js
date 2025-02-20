const { dbConnection } = require("../config/db");
const store = require("../models/store");

const storeService = {
  create: async (data) => {
    try {
      await dbConnection();
      let result = store.create(data);
      return result;
    } catch (error) {
      console.log("DB:error user create Failed.", error);
      return false;
    }
  },

  list: async (data) => {
    console.log("=====>data", data);
    try {
      await dbConnection();
      let result = await store.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            createdAt: 1,
          },
        },
        {
          $match: data.where,
        },
        {
          $sort: data.sorting,
        },
        {
          $skip: data.offset,
        },
        {
          $limit: data.limit,
        },
      ]);

      console.log("====>results", result);
      return result.length > 0 ? result : false;
    } catch (error) {
      console.log("DB:error get storeProduct service query Failed.", error);
      return false;
    }
  },
};

module.exports = storeService;
