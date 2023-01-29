const validator = require("validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a supplier name"],
      trim: true,
      lowercase: true,
      minLength: [3, "name must be at least 3 characters long"],
      maxLength: [100, "name is too long!"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    brand: {
      name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLength: 100,
        lowercase: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "brand",
      },
    },

    contactNumber: [
      {
        type: String,
        require: [true, "Please provide a contact number"],
        validate: {
          validator: function (v) {
            return validator.isMobilePhone(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    ],

    emergencyContactNumber: {
      type: String,
      require: [true, "Please provide a contact number"],
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    tradeLicenseAddress: {
      type: String,
      require: [true, "Please provide a valid trade license address"],
    },

    presentAddress: {
      type: String,
      require: [true, "Please provide a valid trade license address"],
    },

    permanentAddress: {
      type: String,
      require: [true, "Please provide a valid trade license address"],
    },

    location: {
      type: String,
      required: true,
      lowercase: true,
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

    imageUrl: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: "please provide a valid image url",
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = Supplier;
