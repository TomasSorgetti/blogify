import { body, query, param } from "express-validator";
import ValidationMiddleware from "../validation.middleware.js";

export default class FetchValidation extends ValidationMiddleware {
  constructor(validations) {
    super(validations);
  }

  static getArticles() {
    return new FetchValidation([
      query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),
      query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),
      query("tags")
        .optional()
        .isString()
        .withMessage("Tags must be a string"),
      query("isFeatured")
        .optional()
        .isIn(["true", "false"])
        .withMessage("isFeatured must be true or false"),
    ]);
  }

  static getBySlug() {
    return new FetchValidation([
      param("slug").notEmpty().withMessage("Slug is required").isSlug().withMessage("Slug must be valid"),
    ]);
  }

  static trackEvent() {
    return new FetchValidation([
      body("type")
        .notEmpty()
        .withMessage("Event type is required")
        .isIn(["ARTICLE_VIEW", "API_REQUEST", "PAGE_VIEW", "CLICK"])
        .withMessage("Event type must be ARTICLE_VIEW, API_REQUEST, PAGE_VIEW or CLICK"),
      body("articleId")
        .optional()
        .isMongoId()
        .withMessage("articleId must be a valid MongoDB ObjectId"),
      body("metadata")
        .optional()
        .isObject()
        .withMessage("metadata must be an object"),
    ]);
  }
}
