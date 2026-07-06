import SubscriptionRepository from "../../../../infrastructure/modules/subscription/subscription.repository.js";

export const registerSubscriptionRepository = (container, models) => {
  container.register(
    "subscriptionRepository",
    new SubscriptionRepository(models.Subscription),
  );
};
