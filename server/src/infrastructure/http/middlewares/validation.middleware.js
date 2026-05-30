import { validationResult } from "express-validator";
import { InvalidInputError } from "../../../domain/errors/index.js";

export default class ValidationMiddleware {
  constructor(validations) {
    this.validations = validations;
  }

  get handle() {
    return [
      ...this.validations,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(
            new InvalidInputError("Validation failed", errors.array()),
          );
        }
        next();
      },
    ];
  }
}
