import express from "express";
import catchAsync from "../../http/utils/async-handler.js";

export default class NotificationRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ notificationController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = notificationController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/notifications/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.getAll.bind(this.#controller)),
    );
    /**
     * @DELETE /api/notifications/me/:id
     */
    this.#router.delete(
      "/me/:id",
      this.#authMiddleware,
      catchAsync(this.#controller.deleteOne.bind(this.#controller)),
    );
    /**
     * @PATCH /api/notifications/me
     */
    this.#router.patch(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.markAllAsRead.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
