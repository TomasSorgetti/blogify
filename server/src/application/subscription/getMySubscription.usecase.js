import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
import {
  NotFoundError,
  InvalidCredentialsError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class GetMySubscriptionUseCase extends UseCaseContract {
  #subscriptionRepository;
  // #redisService;

  constructor({
    subscriptionRepository,
    // redisService
  }) {
    super();
    this.#subscriptionRepository = subscriptionRepository;
    // this.#redisService = redisService;
  }

  async execute(userId) {
    // todo => add cache
    const subscription = await this.#subscriptionRepository.findByUserId(
      userId
    );
    if (!subscription) throw new NotFoundError("Subscription not found");

    return subscription;
  }
}
