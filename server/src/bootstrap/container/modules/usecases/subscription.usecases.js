import GetMySubscriptionUseCase from "../../../../application/subscription/getMySubscription.usecase.js";
import CreateSubscriptionUseCase from "../../../../application/subscription/createSubscription.usecase.js";
import StripeCheckoutUseCase from "../../../../application/subscription/stripeCheckout.usecase.js";
import StripeVerifySessionUseCase from "../../../../application/subscription/verifyStripeSession.usecase.js";
import ChangePlanUseCase from "../../../../application/subscription/changePlan.usecase.js";

export const registerSubscriptionUseCases = (container, config) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "getMySubscriptionUseCase",
    new GetMySubscriptionUseCase({
      subscriptionRepository: resolveDependency("subscriptionRepository"),
    }),
  );
  container.register(
    "createSubscriptionUseCase",
    new CreateSubscriptionUseCase({
      subscriptionRepository: resolveDependency("subscriptionRepository"),
      userRepository: resolveDependency("userRepository"),
      stripeService: resolveDependency("stripeService"),
    }),
  );
  container.register(
    "stripeCheckoutUseCase",
    new StripeCheckoutUseCase({
      planRepository: resolveDependency("planRepository"),
      userRepository: resolveDependency("userRepository"),
      stripeService: resolveDependency("stripeService"),
      env: config.env,
    }),
  );
  container.register(
    "stripeVerifySessionUseCase",
    new StripeVerifySessionUseCase({
      subscriptionRepository: resolveDependency("subscriptionRepository"),
      stripeService: resolveDependency("stripeService"),
    }),
  );
  container.register(
    "changePlanUseCase",
    new ChangePlanUseCase({
      subscriptionRepository: resolveDependency("subscriptionRepository"),
      planRepository: resolveDependency("planRepository"),
      workbenchRepository: resolveDependency("workbenchRepository"),
      articleRepository: resolveDependency("articleRepository"),
    }),
  );
};
