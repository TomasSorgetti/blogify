import { ForbiddenError } from "../../../domain/errors/index.js";

const RESOURCE_LABELS = {
  workbenches: "workspaces",
  articlesPerWorkbench: "articles in this workspace",
  apiKeys: "API keys",
};

export default class PlanLimitsMiddleware {
  #subscriptionRepository;
  #planRepository;
  #analyticsRepository;

  constructor({ subscriptionRepository, planRepository, analyticsRepository }) {
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
    this.#analyticsRepository = analyticsRepository;
  }

  /**
   * Returns an Express middleware that enforces a plan limit for a given resource.
   *
   * @param {string} featureKey - Key in plan.features (e.g. "workbenches", "articlesPerWorkbench")
   * @param {(req: import("express").Request) => Promise<number>} countFn - Async function that returns current resource count
   * @returns {import("express").RequestHandler}
   */
  checkLimit(featureKey, countFn) {
    return async (req, _res, next) => {
      try {
        const userId = req.user?._id;
        if (!userId) return next();

        const plan = await this.#resolveUserPlan(userId);
        const limit = plan.features?.[featureKey];

        if (limit === undefined || limit === -1) return next();

        if (limit === 0) {
          const label = RESOURCE_LABELS[featureKey] ?? featureKey;
          throw new ForbiddenError(
            `Your ${plan.name} plan does not include ${label}. Upgrade your plan to unlock this feature.`,
          );
        }

        const currentCount = await countFn(req);

        if (currentCount >= limit) {
          const label = RESOURCE_LABELS[featureKey] ?? featureKey;
          throw new ForbiddenError(
            `You've reached the limit of ${limit} ${label} on your ${plan.name} plan. Upgrade to create more.`,
          );
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  checkApiRequestLimit() {
    return async (req, _res, next) => {
      try {
        const userId = req.user?._id;
        if (!userId) return next();

        const plan = await this.#resolveUserPlan(userId);
        let limit = plan.features?.apiRequestsPerMonth;
        if (limit === undefined) {
          if (plan.name === "Free Plan") limit = 1000;
          else if (plan.name === "Pro Plan") limit = 10000;
          else if (plan.name === "Premium Plan") limit = -1;
          else limit = 1000;
        }

        if (limit === -1) return next();

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const currentRequests = await this.#analyticsRepository.countEventsByUserAndTypeInDateRange(
          userId,
          "API_REQUEST",
          startOfMonth,
          endOfMonth
        );

        if (currentRequests >= limit) {
          throw new ForbiddenError(
            `You have reached the API request limit of ${limit} requests per month for your ${plan.name} plan. Upgrade to get more requests.`
          );
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  trackApiRequest() {
    return async (req, _res, next) => {
      try {
        if (req.user) {
          await this.#analyticsRepository.track({
            userId: req.user._id,
            apiKeyId: req.user.apiKeyId,
            workbenchId: req.user.workbenchId,
            type: "API_REQUEST",
            metadata: { path: req.baseUrl + req.path, method: req.method },
            createdAt: new Date(),
          });
        }
        next();
      } catch (err) {
        console.error("[TrackAPIRequest] failed:", err);
        next();
      }
    };
  }

  async #resolveUserPlan(userId) {
    try {
      const subscription =
        await this.#subscriptionRepository.findByUserId(userId);
      if (subscription?.planId) {
        return subscription.planId;
      }
    } catch {}

    return await this.#planRepository.findByName("Free Plan");
  }
}
