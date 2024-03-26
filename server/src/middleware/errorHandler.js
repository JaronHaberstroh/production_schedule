const errorHandler = (error, _, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500);
  res.json({
    status: "error",
    message: error.message || "An unknown error occurred!",
  });
};

export default errorHandler;
