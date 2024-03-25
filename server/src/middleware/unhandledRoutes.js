import AppError from "#utils/appError.js";

const unhandledRoutes = (req, res, next) => {
  const error = new AppError(
    `Path ${req.originalUrl} does not exist for ${req.method} method`,
    404
  );

  next(error);
};

export default unhandledRoutes;
