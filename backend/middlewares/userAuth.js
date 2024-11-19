const userAuth = (req, res, next) => {
  const auth = req.get("Authorization");
  
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
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "failure", msg: "Unauthorized", err });
  }
};

module.exports = userAuth;
