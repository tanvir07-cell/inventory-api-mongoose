const Category = require("../model/Category");

module.exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    if (!categories.length) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: categories,
      message: "Successfully retrieved all categories",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    return res.status(201).json({
      status: true,
      data: category,
      message: "Successfully created category",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
