import { registerUserRepository } from "./user.repositories.js";
import { registerSessionRepository } from "./session.repositories.js";
import { registerSubscriptionRepository } from "./subscription.repositories.js";
import { registerPlanRepository } from "./plan.repositories.js";
import { registerWorkbenchRepository } from "./workbench.repositories.js";
import { registerArticleRepository } from "./article.repositories.js";
import { registerCategoryRepository } from "./category.repositories.js";
import { registerNotificationRepository } from "./notification.repositories.js";
import { registerApiKeyRepository } from "./apikey.repositories.js";
import { registerAnalyticsRepository } from "./analytics.repositories.js";
import { registerActivityLogRepository } from "./activitylog.repositories.js";

export const registerRepositories = (container, config) => {
  const { models } = config.db;

  registerUserRepository(container, models);
  registerSessionRepository(container, models);
  registerSubscriptionRepository(container, models);
  registerPlanRepository(container, models);
  registerWorkbenchRepository(container, models);
  registerArticleRepository(container, models);
  registerCategoryRepository(container, models);
  registerNotificationRepository(container, models);
  registerApiKeyRepository(container, models);
  registerAnalyticsRepository(container, models);
  registerActivityLogRepository(container, models);
};
