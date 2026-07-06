import express from "express";
import catchAsync from "../../http/utils/async-handler.js";

export default class SessionRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ sessionController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = sessionController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/sessions/
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.getAll.bind(this.#controller)),
    );
    /**
     * @GET /api/sessions/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.getSession.bind(this.#controller)),
    );
    /**
     * @DELETE /api/sessions/
     */
    this.#router.delete(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.deleteAll.bind(this.#controller)),
    );
    /**
     * @DELETE /api/sessions/
     */
    this.#router.delete(
      "/:id",
      this.#authMiddleware,
      catchAsync(this.#controller.delete.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
