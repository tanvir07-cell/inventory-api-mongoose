const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

module.exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(500).json({
        status: false,
        message: "User creation failed",
      });
    }
    return res.json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "User creation failed",
      error: err.message,
    });
  }
};

module.exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  // jodi user email and password nah diye login korar try kore:
  if (!email || !password) {
    return res.status(401).json({
      status: false,
      message: "please provide your credentials",
    });
  }
  //   jodi user email and password diye login korar try kore:
  // tahole email diye signUp kora user tike ante hobe tarpor check korte hobe passoword match kore kina
  const user = await User.findOne({ email: email });
  //   jodi user ti create kora na ei thake man e signUp kora jodi na ei thake:
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Please create a user first before login",
    });
  }
  //   ekhon user je create kora ache tar sathe login korte try kora user er password check korbo:
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  //   jodi password match nah kore:
  if (!isPasswordValid) {
    return res.status(403).json({
      status: false,
      message: "Invalid credentials! please try again",
    });
  }

  //   password match korar pore abar check korbo je user ti active kina:
  if (user.status != "active") {
    return res.status(401).json({
      status: false,
      message: "Your account is not active",
    });
  }

  //   now generate token
  const token = generateToken(user);

  //   user er password field ti jate nah jay:
  delete user._doc.password;

  return res.status(201).json({
    status: "Success",
    message: "User login successfully",
    data: {
      token,
      user,
    },
  });
};

module.exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "sucess",
      data: user,
    });
  } catch (err) {
    return res.status(403).json({
      status: false,
      message: err.message,
    });
  }
};
