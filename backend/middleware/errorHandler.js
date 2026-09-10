
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid id format: ${err.value}`;
  }


  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value entered";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};


const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFound };
