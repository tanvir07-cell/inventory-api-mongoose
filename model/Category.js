const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types;
const validator = require("validator");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
      unique: true,
      lowarcase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "please provide a valid image url"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
