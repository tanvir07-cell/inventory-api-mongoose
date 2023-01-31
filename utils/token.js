const jwt = require("jsonwebtoken");

module.exports.generateToken = (userInfo) => {
  const payLoad = {
    email: userInfo.email,
    role: userInfo.role,
  };
  //   sign() er 2nd parameter e secret key bosbe and ei secret key node er crypto theke generate kora hoy:
  const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
    expiresIn: 2000,
  });
  return token;
};
