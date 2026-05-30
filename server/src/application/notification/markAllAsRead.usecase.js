import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class MarkAllAsReadUseCase extends UseCaseContract {
  #notificationRepository;

  constructor({ notificationRepository }) {
    super();
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId }) {
    // todo => add redis
    const res = await this.#notificationRepository.markAllAsRead(userId);
    return res;
  }
}
