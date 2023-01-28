// product schema:
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for this product"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLS: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            // check imageUrl's are array or not:
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              // check if the url is valid or not:
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },

          message: "Please provide valid image URLS",
        },
      },
    ],

    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
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

// product model:
const Product = mongoose.model("Product", productSchema);

/**
 * mongoose eivabe kaaj kore:
 * 1. first e create kora laagbe Schema(website e kiki data thakbe) ti
 * 2. tarpor oi schema theke model create kora laagbe:
 * 3. tarpor query korte hobe:
 */

module.exports = Product;
