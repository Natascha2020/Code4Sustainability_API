const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("public.key");

module.exports = async (req, res, next) => {
  // verify the validity of the access token
  try {
    const checkValidity = await jwt.verify(req.cookies.accessToken, publicKey, { algorithm: "RS256" });
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
