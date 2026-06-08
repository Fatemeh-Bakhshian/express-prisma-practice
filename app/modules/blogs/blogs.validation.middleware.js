import validator from "express-validator";

export const postBlogValidation = [
  validator
    .body("title")
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage("title must be 4-30 chars"),

  validator
    .body("content")
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage("content must be 10-100 chars"),
];
