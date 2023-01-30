const Supplier = require("../model/Supplier");

module.exports.createSupplier = async (req, res) => {
  try {
    const result = await Supplier.create(req.body);
    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "don't create the supplier" });
    }
    return res.status(201).json({
      status: true,
      message: "supplier created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}).populate("brand");
    // populate("products") er means hocceh je brand model e jei products reference ti thakbe tar sob infornmation jate dekhay:
    if (!suppliers.length) {
      return res
        .status(400)
        .json({ status: false, message: "no suppliers available" });
    }
    return res.status(200).json({
      status: true,

      data: suppliers,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById({ _id: req.params.id });

    if (!supplier) {
      return res
        .status(400)
        .json({ status: false, message: "no supplier available" });
    }
    return res.status(200).json({
      status: true,

      data: supplier,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.updateSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );

    if (!supplier.nModified) {
      return res
        .status(400)
        .json({ status: false, message: "can't updated the supplier" });
    }
    return res.status(200).json({
      status: true,

      message: "successfully updated the supplier",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
