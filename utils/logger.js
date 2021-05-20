function warn(message) {
  console.log(new Date().toUTCString(), "| WARN |", message);
}

function info(message) {
  console.log(new Date().toUTCString(), "| INFO |", message);
}

function error(message) {
  console.log(new Date().toUTCString(), "| ERROR |", message);
}

function debug(message) {
  console.log(new Date().toUTCString(), "| DEBUG |", message);
}

function requestLogger(req, res, next) {
  debug(
    `Request received at ${req.url} from ${
      (req.headers["x-forwarded-for"] || "").split(",")[0] ||
      req.connection.remoteAddress
    }`
  );
  next();
}

module.exports = { warn, info, error, debug, requestLogger };
