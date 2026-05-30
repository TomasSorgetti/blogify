import { ForbiddenError } from "../../../domain/errors/index.js";

const RESOURCE_LABELS = {
  workbenches: "workspaces",
  articlesPerWorkbench: "articles in this workspace",
  apiKeys: "API keys",
};

export default class PlanLimitsMiddleware {
  #subscriptionRepository;
  #planRepository;

  constructor({ subscriptionRepository, planRepository }) {
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
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
