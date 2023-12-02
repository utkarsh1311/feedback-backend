import { body, validationResult } from "express-validator";
import ErrorHandler from "../utils/customError";

const getValidationRules = (entity) => {
  switch (entity) {
    case "teacher":
      return {
        create: [
          body("name").notEmpty().withMessage("Name is required"),
          body("email")
            .exists()
            .isEmail()
            .withMessage("Please provide a valid email address")
            .normalizeEmail(),
          body("password")
            .exists()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
          body("phone").exists().withMessage("Phone number is required"),
        ],
        login: [
          body("email")
            .exists()
            .isEmail()
            .withMessage("Please provide a valid email address")
            .normalizeEmail(),
          body("password")
            .exists()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        ],
      };
    case "admin":
      return {
        create: [
          body("name").notEmpty().withMessage("Name is required"),
          body("email")
            .exists()
            .isEmail()
            .withMessage("Please provide a valid email address")
            .normalizeEmail(),
          body("password")
            .exists()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        ],
        login: [
          body("email")
            .exists()
            .isEmail()
            .withMessage("Please provide a valid email address")
            .normalizeEmail(),
          body("password")
            .exists()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        ],
      };
    case "feedback":
      return {
        create: [
          body("student")
            .exists()
            .isString()
            .withMessage("No student provided"),
          body("teacher").exists().withMessage("No teacher provided"),
          body("feedback")
            .exists()
            .isString()
            .withMessage("Feedback is required"),
          body("subject")
            .exists()
            .isString()
            .withMessage("Subject is required"),
          body("createdAt").exists().withMessage("Creation Date is required"),
          body("duration").exists().withMessage("Duration is required"),
          body("testScore").isInt().withMessage("Test score must be a number"),
        ],
      };
    default:
      return {};
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err: any) => {
    return { path: err.path, message: err.msg };
  });
  return next(new ErrorHandler("Validation failed", 403, extractedErrors));
};

export { validate, getValidationRules };