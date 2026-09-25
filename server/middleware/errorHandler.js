/**
 * GridSense AI - Centralized Error Handler
 * Ensures clean user-facing error responses without exposing raw stack traces.
 */

function errorHandler(err, req, res, next) {
  console.error("❌ [API Error]:", err.message);

  const statusCode = err.statusCode || 500;
  const clientMessage = statusCode === 500
    ? "An internal server error occurred while processing energy telemetry."
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message: clientMessage,
      code: err.code || "SERVER_ERROR",
      timestamp: new Date().toISOString()
    }
  });
}

module.exports = errorHandler;
