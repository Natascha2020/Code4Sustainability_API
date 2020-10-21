const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("public.key");

module.exports = async (req, res, next) => {
  // get cookies from the request
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies);

  // verify the validity of the access token
  try {
    const checkValidity = jwt.verify(cookies.accessToken, publicKey, {
      algorithm: "RS256",
    });
    // if valid go next
    if (checkValidity) {
      next();
      return;
    }
  } catch (err) {
    res.sendStatus(401);
    console.log(err);
  }
};
