import successResponse from "../../http/utils/success-response.js";

export default class SubscriptionController {
  #getMySubscriptionUseCase;
  #createSubscriptionUseCase;
  #stripeCheckoutUseCase;
  #stripeVerifySessionUseCase;

  #changePlanUseCase;

  constructor({
    getMySubscriptionUseCase,
    createSubscriptionUseCase,
    stripeCheckoutUseCase,
    stripeVerifySessionUseCase,
    changePlanUseCase,
  }) {
    this.#getMySubscriptionUseCase = getMySubscriptionUseCase;
    this.#createSubscriptionUseCase = createSubscriptionUseCase;
    this.#stripeCheckoutUseCase = stripeCheckoutUseCase;
    this.#stripeVerifySessionUseCase = stripeVerifySessionUseCase;
    this.#changePlanUseCase = changePlanUseCase;
  }

  async getMySubscription(req, res) {
    const userId = req?.user?._id;

    const data = await this.#getMySubscriptionUseCase.execute(userId);

    return successResponse(
      res,
      data,
      "Subscription retrieved successfully",
      200,
    );
  }

  async verifySession(req, res) {
    const userId = req.user._id;
    const { sessionId } = req.body;

    if (!sessionId) throw new Error("Session ID is required");

    const data = await this.#stripeVerifySessionUseCase.execute({
      userId,
      sessionId,
    });

    return successResponse(
      res,
      data,
      "Subscription verified successfully",
      200,
    );
  }

  async stripeCheckout(req, res) {
    const userId = req?.user?._id;

    const { planId } = req.body;

    const session = await this.#stripeCheckoutUseCase.execute({
      userId,
      planId,
    });

    return successResponse(
      res,
      { url: session.url },
      "Checkout session created",
      200,
    );
  }

  async changeSubscription(req, res) {
    const userId = req?.user?._id;
    const { planId, archiveWorkbenchIds, unarchiveWorkbenchIds, archiveArticleIds } = req.body;

    const subscription = await this.#changePlanUseCase.execute({
      userId,
      planId,
      archiveWorkbenchIds,
      unarchiveWorkbenchIds,
      archiveArticleIds,
    });

    return successResponse(
      res,
      subscription,
      "Subscription updated successfully",
      200,
    );
  }

  async cancelSubscription(req, res) {
    const data = "NOT_IMPLEMENTED";

    return successResponse(
      res,
      data,
      "Subscription retrieved successfully",
      200,
    );
  }

  async handleStripeWebhook(req, res) {
    const data = "NOT_IMPLEMENTED";

    return successResponse(
      res,
      data,
      "Subscription retrieved successfully",
      200,
    );
  }

  async handlePaypalWebhook(req, res) {
    const data = "NOT_IMPLEMENTED";

    return successResponse(
      res,
      data,
      "Subscription retrieved successfully",
      200,
    );
  }

  async handleCoinbaseWebhook(req, res) {
    const data = "NOT_IMPLEMENTED";

    return successResponse(
      res,
      data,
      "Subscription retrieved successfully",
      200,
    );
  }
}
