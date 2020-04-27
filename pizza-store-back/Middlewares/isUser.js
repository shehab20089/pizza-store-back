const jsonwebtoken = require("jsonwebtoken");

function isUser(req, res, next) {
  let token = getToken(req);
  if (!token) {
    next();
    return;
  }
  try {
    req.user = jsonwebtoken.verify(token, process.env.JWT_KEY);
  } catch (err) {
    res.status(404).json({
      error: "error please login again"
    });
  }

  next();
}

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = isUser;
