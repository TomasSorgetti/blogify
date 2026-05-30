import { ForbiddenError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class InvalidateApiKeyUseCase extends UseCaseContract {
  #apiKeyRepository;

  constructor({ apiKeyRepository }) {
    super();
    this.#apiKeyRepository = apiKeyRepository;
  }

  async execute({ key, userId }) {
    const apiKey = await this.#apiKeyRepository.getByKey(key);
    
    if (apiKey.userId.toString() !== userId.toString()) {
      throw new ForbiddenError("You don't have permission to invalidate this API key");
    }

    return await this.#apiKeyRepository.deactivate(key);
  }
}
