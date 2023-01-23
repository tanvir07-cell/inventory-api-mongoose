const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// const {
//   globalErrorHandler,
//   globalErrorStatus,
// } = require("./error/globalError.js");

app.use(express.json());
app.use(cors());

// for gloabl error handler:
// app.use(globalErrorStatus);
// app.use(globalErrorHandler);

// product schema:
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);

          if (isInteger) return true;
          else return false;
        },
        message: "quantity must be an integer",
      },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message:
          "status can't be {VALUES}, must be in-stock, out-of-stock, discontinued",
      },
    },
    // supplier: {
    //   /**
    //    * supplier nijeo ekti Schema:
    //    * tai er reference onno ekti Schema teo pass korte hobe
    //    */
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },

    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  { timestamps: true }
);

// mongoose middleware(pre(mongoose e data save hoaar age) and post(mongoose e data save hoaar pore))

productSchema.pre("save", function (next) {
  console.log("Before saving data");
  // eikhane ei karone arrow function use kora hoy nai karon arrow function use korle ei this keyword er value paoaa jay nah:
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

// mongoose logger middleware method:
productSchema.methods.logger = function () {
  console.log(`product save for ${this.name}`);
};

// product model:
const Product = mongoose.model("Product", productSchema);

/**
 * mongoose eivabe kaaj kore:
 * 1. first e create kora laagbe Schema(website e kiki data thakbe) ti
 * 2. tarpor oi schema theke model create kora laagbe:
 * 3. tarpor query korte hobe:
 */

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
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
});

module.exports = app;
