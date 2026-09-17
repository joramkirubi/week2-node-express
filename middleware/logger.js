// Custom middleware: logs every incoming request's method, path, and timestamp
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // pass control to the next middleware/route handler
}

module.exports = requestLogger;
