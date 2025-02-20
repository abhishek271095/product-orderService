const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    allowNull: true,
  },
  password: {
    type: String,
    allowNull: true,
  },
  status: {
    type: String,
    values: ["active", "suspend", "deleted"],
    default: "active",
  },
  stripeId: {
    type: String,
    default: null,
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

module.exports = mongoose.model("user", contentSchema);
