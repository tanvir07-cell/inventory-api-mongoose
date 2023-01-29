const Brand = require("../model/Brand");

module.exports.createBrand = async (req, res, next) => {
  try {
    const result = await Brand.create(req.body);
    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "don't create the brand" });
    }
    return res.status(201).json({
      status: true,
      message: "brand created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({}).populate("products");
    // populate("products") er means hocceh je brand model e jei products reference ti thakbe tar sob infornmation jate dekhay:
    if (!brands.length) {
      return res
        .status(400)
        .json({ status: false, message: "no brands available" });
    }
    return res.status(200).json({
      status: true,

      data: brands,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.findById({ _id: req.params.id });
    console.log(req.params.id);
    if (!brand) {
      return res
        .status(400)
        .json({ status: false, message: "no brands available" });
    }
    return res.status(200).json({
      status: true,

      data: brand,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.updateBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    console.log(brand);

    if (!brand.nModified) {
      return res
        .status(400)
        .json({ status: false, message: "can't updated the brand" });
    }
    return res.status(200).json({
      status: true,

      message: "successfully updated the brand",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
