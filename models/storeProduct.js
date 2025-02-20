const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeProductSchema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  productName: {
    type: String,
    default: null,
  },
  quantity: { type: Number, required: true },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});
module.exports = mongoose.model("storeProduct", storeProductSchema);
