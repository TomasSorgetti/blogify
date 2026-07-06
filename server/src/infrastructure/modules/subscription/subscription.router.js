import express from "express";
import catchAsync from "../../http/utils/async-handler.js";

export default class SubscriptionRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ subscriptionController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = subscriptionController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/subscriptions/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.getMySubscription.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/verify-session
     */
    this.#router.post(
      "/verify-session",
      this.#authMiddleware,
      catchAsync(this.#controller.verifySession.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/checkout
     */
    this.#router.post(
      "/checkout",
      this.#authMiddleware,
      catchAsync(this.#controller.stripeCheckout.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/change
     */
    this.#router.post(
      "/change",
      this.#authMiddleware,
      catchAsync(this.#controller.changeSubscription.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/cancel
     */
    this.#router.post(
      "/cancel",
      this.#authMiddleware,
      catchAsync(this.#controller.cancelSubscription.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/webhooks/stripe
     */
    this.#router.post(
      "/webhooks/stripe",
      express.raw({ type: "application/json" }),
      catchAsync(this.#controller.handleStripeWebhook.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/webhooks/paypal
     */
    this.#router.post(
      "/webhooks/paypal",
      catchAsync(this.#controller.handlePaypalWebhook.bind(this.#controller)),
    );
    /**
     * @POST /api/subscriptions/webhooks/coinbase
     */
    this.#router.post(
      "/webhooks/coinbase",
      catchAsync(this.#controller.handleCoinbaseWebhook.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
