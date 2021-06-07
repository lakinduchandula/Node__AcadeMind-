const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); // read the header
  //console.log("Hello from middleware!!");
  if (!authHeader) {
    // check if the header is undefined
    const error = new Error("Header not found!");
    error.statusCode = 401;
    throw error; // throw err
  }

  const token = authHeader.split(" ")[1]; // read autheader and get token
  //console.log("token ===>", token);
  //   //console.log('jwt ==> ', token);
  let decodedToken; // store the token

  try {
    decodedToken = jwt.verify(token, "lakinduchandulalakinduchadandula"); // decode with the secret key
  } catch (err) {
    //console.log("error in jwt token verify");
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    // check if decodedToken is undefined
    //console.log("jwt decodetoken is undefined");
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId; // store the userId for feature use accross the application it can be extract from request
  //console.log("req.userId in is-auth", req.userId);
  next();
};
