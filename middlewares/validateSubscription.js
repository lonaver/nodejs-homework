const { HttpError } = require("../helpers");

const validateSubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].type === "any.required") {
        next(HttpError(400, "missing field " + error.details[0].path[0]));
      } else {
        next(HttpError(400, error.message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateSubscription;
