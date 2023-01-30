const Stock = require("../model/Stock");

module.exports.getAllStocks = async (req, res, next) => {
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

    const stocks = await Stock.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fieldsBy)
      .sort(queries.sortBy);

    if (stocks.length > 0) {
      return res.status(200).json({
        message: "Get all stocks",
        length: stocks.length,
        products: stocks,
      });
    }
    return res.status(400).json({ message: "stocks not found" });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "can't get all stocks",
      message: err.message,
    });
  }
};

module.exports.createStock = async (req, res, next) => {
  console.log(req.body);
  //  mongoose jei model create korlam sei model theke instance create korbo then save korbo

  try {
    // const product = new Product(req.body);
    // // if (product.quantity == 0) {
    // //   product.status = "out-of-stock";
    // // }
    // const result = await product.save();
    const result = await Stock.create(req.body);

    if (!result) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't save the stock" });
    }

    return res.status(201).json({ status: true, product: result });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.body);

    // 1st way to update the data:

    const stock = await Stock.updateOne({ _id: id }, req.body, {
      runValidators: true,
    });

    // 2nd way to update the data:
    // eikhane runValidators er mean holo jokhon amra product.name=null dibo tokhon error dekhabe karon amader product Schema te product name chilo string e!
    // const product = await Product.findByIdAndUpdate(id, req.body, {
    //   runValidators: true,
    // });

    if (!stock) {
      return res
        .status(400)
        .json({ status: false, message: "couldn't update the stock" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully updated the stock" });
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
