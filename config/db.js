const mongoose = require("mongoose");
// const configJson = require("../config/config.json");
// const config = require("../config/config.json")[configJson.ENVIRONMENT];
// let username = encodeURIComponent(config.MONGO_USERNAME);
// let password = encodeURIComponent(config.MONGO_PASSWORD);
// const MONGODB_URI = `mongodb://${username}:${password}@${config.MONGO_HOST_URL}`;
const MONGODB_URI = `mongodb+srv://abhishekideal271095:EfZOpDGm1Itbw8pr@cluster0.pkoxv.mongodb.net/order_services`;
console.log(MONGODB_URI);
let cachedDb = null;
module.exports.dbConnection = () => {
  if (cachedDb) {
    console.log("=> using cached database instance");
    return Promise.resolve(cachedDb);
  }
  return mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    })
    .then((db) => {
      console.log("MongoDB Connected Successfully");
      cachedDb = db;
      return cachedDb;
    })

    .catch((error) => {
      console.log("Error mongodb connection Failed", error);
    });
};
