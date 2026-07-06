import { body, param } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class WorkbenchValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static create() {
    return new WorkbenchValidation([
      body("name")
        .notEmpty()
        .withMessage("Workbench name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    ]);
  }

  static update() {
    return new WorkbenchValidation([
      param("workbenchId").isMongoId().withMessage("Invalid workbench ID"),
      body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .trim(),
      body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    ]);
  }

  static addMember() {
    return new WorkbenchValidation([
      param("workbenchId").isMongoId().withMessage("Invalid workbench ID"),
      body("userId")
        .optional()
        .isMongoId()
        .withMessage("userId must be a valid MongoDB ObjectId"),
      body("email")
        .optional()
        .isEmail()
        .withMessage("email must be a valid email address"),
    ]);
  }

  static updateMemberRole() {
    return new WorkbenchValidation([
      param("workbenchId").isMongoId().withMessage("Invalid workbench ID"),
      param("targetUserId").isMongoId().withMessage("Invalid target user ID"),
      body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["owner", "editor", "viewer"])
        .withMessage("Role must be owner, editor or viewer"),
    ]);
  }

  static removeMember() {
    return new WorkbenchValidation([
      param("workbenchId").isMongoId().withMessage("Invalid workbench ID"),
      param("targetUserId").isMongoId().withMessage("Invalid target user ID"),
    ]);
  }
}
