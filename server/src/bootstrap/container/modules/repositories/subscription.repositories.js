import SubscriptionRepository from "../../../../infrastructure/database/repositories/subscription.repository.js";

export const registerSubscriptionRepository = (container, models) => {
  container.register(
    "subscriptionRepository",
    new SubscriptionRepository(models.Subscription),
  );
};
