import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class getMyNotificationsUseCase extends UseCaseContract {
  #notificationRepository;

  constructor({ notificationRepository }) {
    super();
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId }) {
    // todo => add redis
    return await this.#notificationRepository.findByUser(userId);
  }
}
