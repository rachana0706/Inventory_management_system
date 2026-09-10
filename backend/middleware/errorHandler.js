// Centralized error handler. Converts known Mongoose/validation errors into
// clean 4xx responses and falls back to 500 for anything unexpected.
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation error (e.g. missing required field, negative price)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Invalid MongoDB ObjectId (e.g. malformed :id in URL)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid id format: ${err.value}`;
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value entered";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

// 404 handler for unmatched routes
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFound };
