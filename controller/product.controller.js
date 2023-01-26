const Product = require("../model/Product");

module.exports.getProducts = async (req, res, next) => {
  try {
    const { status } = req.query;

    let filters = { ...req.query };

    // now i am excluding the query paramter(limit,page,sort) only taking status query
    // that means ami only status query diye data anbo:
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((fields) => delete filters[fields]);

    // ekhon ei filters jate (price/quantity >= )er jonneo kaaj kore:
    //gt lt gte lte

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    // ami chaitesi route er moddei query kore user data sort ba aro kaaj korte parbe:
    const queries = {};

    // for sorting query:
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // select query/projection query(that means amra jei jei property er data gula dekhte chai shudu sei sei data gulay dekhte pabo)

    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      queries.fieldsBy = fieldsBy;
      console.log(queries);
    }

    // for pagination:
    // user jodi route er moddeh query hishebe page pass kore:
    if (req.query.page) {
      // By deafult pages value 1 and limit's value 10
      let { page = 1, limit = 5 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
      console.log(queries);
    }

    const products = await Product.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fieldsBy)
      .sort(queries.sortBy);

    if (products.length > 0) {
      return res.status(200).json({
        message: "Get all products",
        length: products.length,
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

module.exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.deleteOne(
      { _id: id },
      { runValidators: true }
    );

    if (product.deletedCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't delete the products" });
    }
    return res
      .status(203)
      .json({ status: true, message: "successfully deleted the product" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports.deleteBulkProduct = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const products = await Product.deleteMany({ _id: ids });

    if (products.deletedCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't delete the products" });
    }
    return res
      .status(203)
      .json({ status: true, message: "successfully deleted the products" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};
