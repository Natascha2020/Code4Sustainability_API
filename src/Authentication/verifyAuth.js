const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("public.pem");
const cookie = require("cookie");

module.exports = async (req, res, next) => {
  // verify the validity of the access token
  try {
    console.log("cookies", req.cookies);
    const cookies = cookie.parse(req.headers.cookie || "");
    const checkValidity = await jwt.verify(cookies.accessToken, "cat");
    /*  const checkValidity = await jwt.verify(req.cookies.accessToken, "cat"); */
    console.log(cookies);
    console.log(checkValidity);
    // if valid go next
    if (checkValidity) {
      req.user = {
        idUser: checkValidity.idUser,
      };
      next();
    }
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
  }
};
