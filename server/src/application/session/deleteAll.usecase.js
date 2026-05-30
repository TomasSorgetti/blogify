import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class DeleteAllSessionsUseCase extends UseCaseContract {
  #sessionRepository;

  constructor({ sessionRepository }) {
    super();
    this.#sessionRepository = sessionRepository;
  }

  async execute(userId) {
    return await this.#sessionRepository.deleteByUserId(userId);
  }
}
