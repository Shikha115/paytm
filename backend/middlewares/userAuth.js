const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  const auth = req.get("Authorization");
  
  // console.log("User auth", auth);

  if (!auth || !auth.startsWith("Bearer")) {
    return res
      .status(401)
      .json({
        status: "failure",
        msg: "Unauthorized - send token with bearer",
      });
  }
  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "failure", msg: "Unauthorized", err });
  }
};

module.exports = userAuth;
