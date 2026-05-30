import { CustomError } from "../../../domain/errors/index.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.status).json(err.toJSON());
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: {
        name: "ValidationError",
        code: "VALIDATION_FAILED",
        message: "Request validation failed",
        details: err.errors || {},
      },
    });
  }

  // Handle MongoDB errors
  if (
    err.name === "MongoError" ||
    err.name === "MongoServerError" ||
    err.name === "CastError"
  ) {
    const message =
      err.name === "CastError"
        ? "Invalid ID format"
        : "Database operation failed";
    return res.status(500).json({
      error: {
        name: "DatabaseError",
        code: "DB_ERROR",
        message,
      },
    });
  }

  // Handle JSON parse errors
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: {
        name: "SyntaxError",
        code: "INVALID_JSON",
        message: "Invalid JSON in request body",
      },
    });
  }

  const status = err.status || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Something went wrong";

  if (process.env.NODE_ENV === "production") {
    console.error({
      timestamp: new Date().toISOString(),
      status,
      code,
      message,
      path: req.path,
      method: req.method,
      userId: req.user?._id,
      stack: err.stack,
    });
  }

  res.status(status).json({
    error: {
      name: err.name || "Error",
      code,
      message,
      details: err.details || {},
    },
  });
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});
