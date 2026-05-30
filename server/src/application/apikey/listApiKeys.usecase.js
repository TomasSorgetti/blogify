import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class ListApiKeysUseCase extends UseCaseContract {
  #apiKeyRepository;

  constructor({ apiKeyRepository }) {
    super();
    this.#apiKeyRepository = apiKeyRepository;
  }

  async execute({ userId, workbenchId }) {
    return await this.#apiKeyRepository.listByUser(userId, { workbenchId });
  }
}
