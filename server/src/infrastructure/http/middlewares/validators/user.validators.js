import { body, param, query } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class UserValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static updateProfile() {
    return new UserValidation([
      body("username")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .trim(),
      body("bio")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Bio must not exceed 300 characters"),
    ]);
  }

  static changePassword() {
    return new UserValidation([
      body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),
      body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 5 })
        .withMessage("New password must be at least 5 characters long")
        .custom((value, { req }) => {
          if (value === req.body.currentPassword) {
            throw new Error("New password must differ from current password");
          }
          return true;
        }),
    ]);
  }

  static changeEmail() {
    return new UserValidation([
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
      body("password")
        .notEmpty()
        .withMessage("Password is required to confirm email change"),
    ]);
  }

  static searchUsers() {
    return new UserValidation([
      query("q")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Search query must be between 2 and 100 characters"),
    ]);
  }

  static adminCreateUser() {
    return new UserValidation([
      body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email address"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters"),
      body("role")
        .optional()
        .isIn(["user", "admin", "moderator"])
        .withMessage("Role must be user, admin or moderator"),
    ]);
  }

  static adminChangeRole() {
    return new UserValidation([
      param("id").isMongoId().withMessage("Invalid user ID"),
      body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["user", "admin", "moderator"])
        .withMessage("Role must be user, admin or moderator"),
    ]);
  }
}
