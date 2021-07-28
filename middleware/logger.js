function log(req, res, next) {
  console.log("logging...");
  next();
}
function ath(req, res, next) {
  console.log("athentication...");
  next();
}

module.exports = { log, ath };
