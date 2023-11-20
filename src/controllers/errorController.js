const CustomError = require("../models/errorModel");

function handleRouteNotFound(req, res, next) {
  const error = new CustomError(
    `Cannot find ${req.method} ${req.originalUrl} endpoint on this server.`,
    404
  );
  next(error);
}

function handleGlobalError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

const handleAsyncError = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch(next);
  };
};

module.exports = {
  handleRouteNotFound,
  handleGlobalError,
  handleAsyncError,
};
