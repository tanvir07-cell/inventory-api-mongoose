const jwt = require("jsonwebtoken");
// login korar pore ami user ke jei token dibo sei token er sathe amar client side theke ekti token asbe (Bearer token) hishebe ei client side er token er sathe amar server side e login korar pore jei token generate kore deoaa hoise tar sathe match korabe:

// ei 2 ti token match korle user ti jodi login kora obostay o browser theke ber hoye jay taholeo login kora obostay ei thakbe:

module.exports.verifyToken = (req, res, next) => {
  // bearer token hishebe client side theke token ti asbe and ei theke bearer ke remove kora hoise ei token er maddome:
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: fail,
      message: "you are not logged in",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json("token is not valid");
    // jodi token ti valid hoy tahole jwt.verify er modeeh ekti user asbe:
    req.user = user;
    next();
  });
};
