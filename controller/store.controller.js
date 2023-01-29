const Store = require("../model/Store");

module.exports.getAllSotre = async (req, res, next) => {
  try {
    const stores = await Store.find({});
    if (!stores.length) {
      return res.status(404).json({
        status: false,
        message: "stores not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: stores,
      message: "Successfully retrieved all stores",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.createStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    if (!store) {
      return res.status(404).json({
        status: false,
        message: "store not found",
      });
    }
    return res.status(201).json({
      status: true,
      data: store,
      message: "Successfully created store",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findById({ _id: req.params.id });
    if (!store) {
      return res.status(404).json({
        status: false,
        message: "store not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: store,
      message: "Successfully get the store",
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
