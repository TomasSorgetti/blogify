import express from "express";
import catchAsync from "../../utils/async-handler.js";

export default class PlanRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ planController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = planController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/plans
     */
    this.#router.get("/", catchAsync(this.#controller.getAll.bind(this.#controller)));

    /**
     * @POST /api/plans
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.create.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
