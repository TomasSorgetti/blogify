import { registerAuthControllers } from "./auth.controllers.js";
import { registerUserControllers } from "./user.controllers.js";
import { registerSessionControllers } from "./session.controllers.js";
import { registerWorkbenchControllers } from "./workbench.controllers.js";
import { registerArticleControllers } from "./article.controllers.js";
import { registerCategoryControllers } from "./category.controllers.js";
import { registerSubscriptionControllers } from "./subscription.controllers.js";
import { registerNotificationControllers } from "./notification.controllers.js";
import { registerPlanControllers } from "./plan.controllers.js";
import { registerApiKeyControllers } from "./apikey.controllers.js";
import { registerFetchControllers } from "./fetch.controllers.js";

export const registerControllers = (container) => {
  registerAuthControllers(container);
  registerUserControllers(container);
  registerSessionControllers(container);
  registerWorkbenchControllers(container);
  registerArticleControllers(container);
  registerCategoryControllers(container);
  registerSubscriptionControllers(container);
  registerNotificationControllers(container);
  registerPlanControllers(container);
  registerApiKeyControllers(container);
  registerFetchControllers(container);
};
