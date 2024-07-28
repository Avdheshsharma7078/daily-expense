const { body, validationResult } = require("express-validator");

exports.validateUser = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("name").notEmpty().withMessage("Name is required"),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateExpense = [
  body("description").notEmpty().withMessage("Description is required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("splitMethod")
    .isIn(["equal", "exact", "percentage"])
    .withMessage("Invalid split method"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
