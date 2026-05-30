import SubscriptionController from "../../../../infrastructure/http/controllers/subscription.controller.js";

export const registerSubscriptionControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "subscriptionController",
    new SubscriptionController({
      getMySubscriptionUseCase: resolveDependency("getMySubscriptionUseCase"),
      createSubscriptionUseCase: resolveDependency("createSubscriptionUseCase"),
      stripeCheckoutUseCase: resolveDependency("stripeCheckoutUseCase"),
      stripeVerifySessionUseCase: resolveDependency(
        "stripeVerifySessionUseCase",
      ),
      changePlanUseCase: resolveDependency("changePlanUseCase"),
    }),
  );
};
