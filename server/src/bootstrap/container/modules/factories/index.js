import { registerUserFactory } from "./user.factories.js";
import { registerArticleFactory } from "./article.factories.js";
import { registerCategoryFactory } from "./category.factories.js";
import { registerSessionFactory } from "./session.factories.js";
import { registerSubscriptionFactory } from "./subscription.factories.js";
import { registerWorkbenchFactory } from "./workbench.factories.js";
import { registerNotificationFactory } from "./notification.factories.js";
import { registerApiKeyFactory } from "./apikey.factories.js";

export const registerFactories = (container) => {
  registerUserFactory(container);
  registerArticleFactory(container);
  registerCategoryFactory(container);
  registerSessionFactory(container);
  registerSubscriptionFactory(container);
  registerWorkbenchFactory(container);
  registerNotificationFactory(container);
  registerApiKeyFactory(container);
};
