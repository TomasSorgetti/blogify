import { body, param } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class ApiKeyValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static create() {
    return new ApiKeyValidation([
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),
      body("workbenchId")
        .optional()
        .isMongoId()
        .withMessage("Workbench ID must be a valid MongoDB ObjectId"),
      body("expiresAt")
        .optional()
        .isISO8601()
        .withMessage("ExpiresAt must be a valid ISO8601 date"),
      body("scopes")
        .optional()
        .isArray()
        .withMessage("Scopes must be an array of strings"),
    ]);
  }

  static invalidate() {
    return new ApiKeyValidation([
      param("key").notEmpty().withMessage("API Key is required"),
    ]);
  }
}
