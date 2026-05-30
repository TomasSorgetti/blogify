import express from "express";
import catchAsync from "../../utils/async-handler.js";

export default class CategoryRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ categoryController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = categoryController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/categories/
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.getAll.bind(this.#controller)),
    );
    /**
     * @GET /api/categories/:id
     */
    this.#router.get(
      "/:id",
      // this.#authMiddleware,
      catchAsync(this.#controller.getCategoryById.bind(this.#controller)),
    );
    /**
     * @POST /api/categories/
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.createCategory.bind(this.#controller)),
    );
    /**
     * @PATCH /api/categories/:id
     */
    this.#router.patch(
      "/:id",
      this.#authMiddleware,
      catchAsync(this.#controller.updateCategory.bind(this.#controller)),
    );
    /**
     * @DELETE /api/categories/:id
     */
    this.#router.delete(
      "/:id",
      this.#authMiddleware,
      catchAsync(this.#controller.deleteCategory.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
