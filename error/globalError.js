module.exports.globalErrorStatus = (req, res, next) => {
  const err = new Error("Pages not found!");
  err.status = 404;
  next(err);
};

module.exports.globalErrorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(`<h1>${err.message}</h1>`);
  }

  //   server error:
  return res.status(500).send(`<h1>Server error occured!</h1>`);
};
