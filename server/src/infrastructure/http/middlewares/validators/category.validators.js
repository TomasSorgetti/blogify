import { body, param } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class CategoryValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static create() {
    return new CategoryValidation([
      body("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2, max: 80 })
        .withMessage("Name must be between 2 and 80 characters")
        .trim(),
      body("workbenchId")
        .optional()
        .isMongoId()
        .withMessage("workbenchId must be a valid MongoDB ObjectId"),
    ]);
  }

  static update() {
    return new CategoryValidation([
      param("id").isMongoId().withMessage("Invalid category ID"),
      body("name")
        .optional()
        .isLength({ min: 2, max: 80 })
        .withMessage("Name must be between 2 and 80 characters")
        .trim(),
    ]);
  }

  static getById() {
    return new CategoryValidation([
      param("id").isMongoId().withMessage("Invalid category ID"),
    ]);
  }

  static delete() {
    return new CategoryValidation([
      param("id").isMongoId().withMessage("Invalid category ID"),
    ]);
  }
}
