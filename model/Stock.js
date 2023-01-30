const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },

    name: {
      type: String,

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

    price: {
      type: Number,
      required: true,
      min: [0, "product price can't be negative"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "product quantity can't be negative"],
    },

    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Product status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
        lowarcase: true,
        enum: {
          values: [
            "Dhaka",
            "Chattogram",
            "Khulna",
            "Barishal",
            "Rajshahi",
            "Rangpur",
            "Mymensingh",
          ],
          message: "{VALUE} is not a valid store name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },

      suppliedBy: {
        name: {
          type: String,
          required: [true, "Please provide a supplier name"],
          trim: true,
        },
        contactNumber: String,
        id: {
          type: ObjectId,

          ref: "Supplier",
        },
      },
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
    sellCount: {
      type: Number,
      default: 0,
      min: [0, "sellCount not be a negative number"],
    },
  },
  { timestamps: true }
);

// // mongoose middleware(pre(mongoose e data save hoaar age) and post(mongoose e data save hoaar pore))

// productSchema.pre("save", function (next) {
//   console.log("Before saving data");
//   // eikhane ei karone arrow function use kora hoy nai karon arrow function use korle ei this keyword er value paoaa jay nah:
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

// product model:
const Stock = mongoose.model("Stock", stockSchema);

/**
 * mongoose eivabe kaaj kore:
 * 1. first e create kora laagbe Schema(website e kiki data thakbe) ti
 * 2. tarpor oi schema theke model create kora laagbe:
 * 3. tarpor query korte hobe:
 */

module.exports = Stock;
