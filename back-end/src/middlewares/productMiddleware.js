const { body, validationResult } = require("express-validator");

const validationChain = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name can not be empty"),
    body("categorie")
      .trim()
      .notEmpty()
      .withMessage("Categorie can not be empty"),
    body("quantity")
      .isInt()
      .withMessage("Quantity need to be an integer")
      .notEmpty()
      .withMessage("Quantity can not be empty"),
  ];
};

const validateBody = (req, res, next) => {
  const result = validationResult(req);
  const errors = [];
  if (!result.isEmpty()) {
    result
      .array()
      .map((error) =>
        errors.push({ Location: error.location, Message: error.msg })
      );
    return res.status(400).json({ errors: errors });
  }
  return next();
};
module.exports = {
  validateBody,
  validationChain,
};
