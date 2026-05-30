import express from "express";
import ApiKeyValidation from "../../middlewares/validators/apikey.validators.js";
import catchAsync from "../../utils/async-handler.js";

export default class ApiKeyRouter {
  #router;
  #controller;
  #authMiddleware;
  #planLimitsMiddleware;
  #apiKeyRepository;
  #rateLimiterMiddleware;

  constructor({
    apiKeyController,
    authMiddleware,
    planLimitsMiddleware,
    apiKeyRepository,
    rateLimiterMiddleware,
  }) {
    this.#router = express.Router();
    this.#controller = apiKeyController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#planLimitsMiddleware = planLimitsMiddleware;
    this.#apiKeyRepository = apiKeyRepository;
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/keys
     * Auth - List all API keys for the current user
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.getAllByCurrentUser.bind(this.#controller)),
    );

    /**
     * @POST /api/keys
     * Auth - Create a new API key
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#planLimitsMiddleware.checkLimit("apiKeys", (req) =>
        this.#apiKeyRepository.countByUser(req.user._id),
      ),
      ApiKeyValidation.create().handle,
      catchAsync(this.#controller.create.bind(this.#controller)),
    );

    /**
     * @DELETE /api/keys/:key
     * Auth - Invalidate an API key
     */
    this.#router.delete(
      "/:key",
      this.#authMiddleware,
      ApiKeyValidation.invalidate().handle,
      catchAsync(this.#controller.invalidate.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
