const { dbConnection } = require("../config/db");
const storeProduct = require("../models/storeProduct");
const storeProductService = {
  create: async (data) => {
    try {
      await dbConnection();
      let result = storeProduct.create(data);
      return result;
    } catch (error) {
      console.log("DB:error storeProduct create Failed.", error);
      return false;
    }
  },

  getOne: async (data) => {
    console.log("*******dataSer", data);
    try {
      await dbConnection();
      let result = await storeProduct.findById(data).exec();
      console.log("*******result", result);
      return result;
    } catch (error) {
      console.log("DB:error order getOne Failed.", error);
      return false;
    }
  },

  list: async (data) => {
    console.log("=====>data", data);
    try {
      await dbConnection();
      let result = await storeProduct.aggregate([
        {
          $lookup: {
            from: "storeProduct",
            localField: "_id",
            foreignField: "rootId",
            pipeline: [
              {
                $project: {
                  title: 1,
                  status: 1,
                  position: 1,
                  publicId: 1,
                  _id: 1,
                },
              },
            ],
            as: "subCategory",
          },
        },
        {
          $project: {
            _id: 1,
            storeId: 1,
            productName: 1,
            quantity: 1,
            price: 1,
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

module.exports = storeProductService;
