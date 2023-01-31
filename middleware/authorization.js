module.exports.authorization = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized for this route",
      });
    }
  };
};
