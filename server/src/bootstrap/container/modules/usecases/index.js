import { registerAuthUseCases } from "./auth.usecases.js";
import { registerUserUseCases } from "./user.usecases.js";
import { registerSessionUseCases } from "./session.usecases.js";
import { registerWorkbenchUseCases } from "./workbench.usecases.js";
import { registerArticleUseCases } from "./article.usecases.js";
import { registerCategoryUseCases } from "./category.usecases.js";
import { registerSubscriptionUseCases } from "./subscription.usecases.js";
import { registerNotificationUseCases } from "./notification.usecases.js";
import { registerPlanUseCases } from "./plan.usecases.js";
import { registerApiKeyUseCases } from "./apikey.usecases.js";
import { registerAnalyticsUseCases } from "./analytics.usecases.js";

export const registerUseCases = (container, config) => {
  registerAuthUseCases(container, config);
  registerUserUseCases(container);
  registerSessionUseCases(container);
  registerWorkbenchUseCases(container);
  registerArticleUseCases(container);
  registerCategoryUseCases(container);
  registerSubscriptionUseCases(container, config);
  registerNotificationUseCases(container);
  registerPlanUseCases(container);
  registerApiKeyUseCases(container);
  registerAnalyticsUseCases(container);
};
