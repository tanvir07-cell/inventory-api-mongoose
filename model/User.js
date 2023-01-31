const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Please provide a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (v) {
          validator.isStrongPassword(v, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
          message: "Password {VALUE} is not strong enough";
        },
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (v) {
          return v === this.password;
        },
        message: "password does not match",
      },
    },

    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer",
    },

    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      minLength: [3, "name must be at least 3 characters long"],
      maxLength: [100, "name is too long"],
    },

    lastName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      minLength: [3, "name must be at least 3 characters long"],
      maxLength: [100, "name is too long"],
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v);
        },
        message: "please enter a valid phone number",
      },
    },
    shippingAddress: String,
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
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

// user er model ti create korar agei amra schema er pre middleware diye password ti ke hash kore nibo. and ei password hash korar jonne amra bcrypt ti use korbo:

userSchema.pre("save", function (next) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(this.password, saltRounds);
  //   ekhon amar user schema er plain password ti ke hash password e save korbo:
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
