import SubscriptionFactory from "../../../../domain/factories/subscription.factory.js";

export const registerSubscriptionFactory = (container) => {
  container.register("subscriptionFactory", new SubscriptionFactory());
};
