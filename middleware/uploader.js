const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    // jodi 2 jon user ekoi file add kore ekoi name e and jate kore file name unique hoy tar jonne uniqueSuffix use kora hoise
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // ei fileFilter diye amra filter kobo kon kon type er extension wala file amra rakhte chai amar server e:
    const supportedImage = /png|jpg|webp/;
    // ami jei file ti server e rekechi tar extension:
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/webp image"));
    }
  },
});

module.exports = uploader;
