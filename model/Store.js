const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      trim: true,
      lowarcase: true,
      enum: {
        values: [
          "Dhaka",
          "Chattogram",
          "Khulna",
          "Barishal",
          "Rajshahi",
          "Rangpur",
          "Mymensingh",
        ],
        message: "{VALUE} is not a valid store name",
      },
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "please provide a valid image url"],
    },
    statue: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

module.exports = storeSchema;
