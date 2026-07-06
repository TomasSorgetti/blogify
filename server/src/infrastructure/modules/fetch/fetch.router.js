import express from "express";
import FetchValidation from "../../http/middlewares/validators/fetch.validators.js";

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
    const planLimits = dependencies.planLimitsMiddleware.checkApiRequestLimit();
    const trackRequest = dependencies.planLimitsMiddleware.trackApiRequest();

    this.#router.use(planLimits);
    this.#router.use(trackRequest);

    /**
     * @GET /fetch/articles
     */
    this.#router.get("/articles", limiter, FetchValidation.getArticles().handle, controller.getAll.bind(controller));

    /**
     * @GET /fetch/articles/:slug
     */
    this.#router.get("/articles/:slug", limiter, FetchValidation.getBySlug().handle, controller.getBySlug.bind(controller));

    /**
     * @GET /fetch/categories
     */
    this.#router.get("/categories", limiter, controller.getCategories.bind(controller));

    /**
     * @POST /fetch/analytics/events
     */
    this.#router.post("/analytics/events", limiter, FetchValidation.trackEvent().handle, controller.trackEvent.bind(controller));

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
