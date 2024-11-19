function userValidate(schema) {
  return (req, res, next) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        status: "failure",
        msg: "Invalid user input",
        err: parse.error.errors,
      });
    }
    next();
  };
}

module.exports = userValidate;
