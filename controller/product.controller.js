const Product = require("../model/Product");

module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (products.length > 0) {
      return res.status(200).json({
        message: "Get all products",
        products: products,
      });
    }
    return res.status(400).json({ message: "Product not found" });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "can't get all products",
      message: err.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  console.log(req.body);
  //  mongoose jei model create korlam sei model theke instance create korbo then save korbo

  try {
    const product = new Product(req.body);
    // if (product.quantity == 0) {
    //   product.status = "out-of-stock";
    // }
    const result = await product.save();

    // calling the logger method:
    result.logger();

    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't save the product" });
    }

    return res.status(201).json({ status: true, product: result });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.body);

    // 1st way to update the data:

    const product = await Product.updateOne({ _id: id }, req.body, {
      runValidators: true,
    });

    // 2nd way to update the data:
    // eikhane runValidators er mean holo jokhon amra product.name=null dibo tokhon error dekhabe karon amader product Schema te product name chilo string e!
    // const product = await Product.findByIdAndUpdate(id, req.body, {
    //   runValidators: true,
    // });

    if (!product) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't update the product" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully updated the product" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports.updateBulkProduct = async (req, res, next) => {
  try {
    // 1st way bulk update in this way only same value update for different product

    // const products = await Product.updateMany({ _id: req.body.ids }, req.body, {
    //   runValidators: true,
    // });

    const { ids } = req.body;
    console.log(ids);

    const products = [];

    // jodi eksathe bulk update korte chai and ektir price and onnotir name update korte chai
    ids.forEach((product) => {
      console.log(product.data);
      products.push(
        Product.updateOne({ _id: product.id }, product.data, {
          runValidators: true,
        })
      );
    });
    const result = await Promise.all(products);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't update the products" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully updated the products" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};
