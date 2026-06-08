import validator from "express-validator";

export const loginValidation = [
  validator
    .body("email")
    .isString()
    .withMessage("email is required")
    .isEmail()
    .withMessage("incorrect email format!"),
  validator
    .body("password")
    .isString()
    .withMessage("password is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("password must be 4-10 chars"),
];

export const signInValidation = [
  validator
    .body("name")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("name is required and must be 4-10 chars"),
  validator
    .body("email")
    .isString()
    .isEmail()
    .withMessage("incorrect email format!"),
  validator
    .body("password")
    .isString()
    .isLength({ min: 4, max: 10 })
    .withMessage("password must be 4-10 chars"),
];

export const checkValidation = (request, response, next) => {
  const err = validator.validationResult(request);
  if (!err.isEmpty()) {
    return response.status(422).send(err);
  }
  next();
};
