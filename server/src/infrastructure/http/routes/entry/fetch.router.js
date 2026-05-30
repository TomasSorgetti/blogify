import express from "express";

export default class FetchRouter {
  #router;
  #articleController;
  #rateLimiterMiddleware;

  constructor(dependencies = {}) {
    this.#router = express.Router();
    this.#articleController = dependencies.articleController;
    this.#rateLimiterMiddleware = dependencies.rateLimiterMiddleware;
    this.#setupRoutes(dependencies);
  }

  #setupRoutes(dependencies) {
    const controller = dependencies.fetchController;
    const limiter = this.#rateLimiterMiddleware?.handleGeneric() || ((req, res, next) => next());

    /**
     * @GET /fetch/articles
     */
    this.#router.get("/articles", limiter, controller.getAll.bind(controller));

    /**
     * @GET /fetch/articles/:slug
     */
    this.#router.get("/articles/:slug", limiter, controller.getBySlug.bind(controller));

    /**
     * @GET /fetch/categories
     */
    this.#router.get("/categories", limiter, controller.getCategories.bind(controller));

    /**
     * @POST /fetch/analytics/events
     */
    this.#router.post("/analytics/events", limiter, controller.trackEvent.bind(controller));

    /**
     * @GET /fetch/stats
     * Private-ish (used by dashboard but routed here for analytics context)
     */
    this.#router.get("/stats", limiter, controller.getStats.bind(controller));
  }

  getRouter() {
    return this.#router;
  }
}
