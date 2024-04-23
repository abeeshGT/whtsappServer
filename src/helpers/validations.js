// const { validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");

const signUpValidationRules = [
  body("business_name").notEmpty().withMessage("Business name is required"),
  body("business_email").isEmail().withMessage("Invalid email format"),
  body("phone").isMobilePhone("any").withMessage("Invalid phone number"),
  body("website").isURL().optional(), // Make website optional
  body("country").notEmpty().withMessage("Country is required"),
  body("street").notEmpty().withMessage("Street address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("zip").notEmpty().withMessage("ZIP code is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const signUpValidate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Proceed if validation passes
};

module.exports = {
  signUpValidationRules,
  signUpValidate,
};
