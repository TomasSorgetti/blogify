import { UnauthorizedError } from "../../../domain/errors/index.js";

export default class AdminMiddleware {
  handle(req, res, next) {
    if (req.user?.role !== "admin") {
      return next(new UnauthorizedError("Admin access required"));
    }
    next();
  }
}
