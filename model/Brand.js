const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide a brand name"],
      maxLength: 100,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    location: String,
    //   ekekti brand er under e onekgula products thakbe tai Product model tir reference pass kore dite hobe ei Brand Model er moddeh:
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    suppliers: [
      {
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
        name: String,
        contactNumber: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// creating mode:
const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
