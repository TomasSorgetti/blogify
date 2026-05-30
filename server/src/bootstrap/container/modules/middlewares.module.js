import AuthMiddleware from "../../../infrastructure/http/middlewares/auth.middleware.js";
import ApiKeyMiddleware from "../../../infrastructure/http/middlewares/apiKey.middleware.js";
import PlanLimitsMiddleware from "../../../infrastructure/http/middlewares/planLimits.middleware.js";
import RateLimiterMiddleware from "../../../infrastructure/http/middlewares/rateLimiter.middleware.js";

export const registerMiddlewares = (container) => {
  const jwtService = container.resolve("jwtService");
  const apiKeyRepository = container.resolve("apiKeyRepository");
  const subscriptionRepository = container.resolve("subscriptionRepository");
  const planRepository = container.resolve("planRepository");
  const rateLimiterService = container.resolve("rateLimiterService");

  container.register("authMiddleware", new AuthMiddleware({ jwtService }));
  container.register(
    "apiKeyMiddleware",
    new ApiKeyMiddleware({ apiKeyRepository }),
  );
  container.register(
    "planLimitsMiddleware",
    new PlanLimitsMiddleware({ subscriptionRepository, planRepository }),
  );
  container.register(
    "rateLimiterMiddleware",
    new RateLimiterMiddleware({ rateLimiterService }),
  );
};
