const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      next(HttpError(400, "missing fields"));
    const { error } = schema.validate(req.body);
    if (error) {
      if (error.details[0].type === "any.required") {
        next(HttpError(400, "missing required " + error.details[0].path[0]));
      } else {
        next(HttpError(400, error.message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;
