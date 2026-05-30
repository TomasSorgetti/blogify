import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class DeleteOneNotificationUseCase extends UseCaseContract {
  #notificationRepository;

  constructor({ notificationRepository }) {
    super();
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId, id }) {
    // todo => add redis
    const res = await this.#notificationRepository.delete(id);
    return res;
  }
}
