const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("public.pem");

module.exports = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log("cookies", cookies);
  // verify the validity of the access token
  try {
    const checkValidity = await jwt.verify(cookies.accessToken, process.env.SEC);
    /* const checkValidity = await jwt.verify(req.cookies.accessToken, "cat"); */

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
