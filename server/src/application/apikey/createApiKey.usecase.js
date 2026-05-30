import crypto from "crypto";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class CreateApiKeyUseCase extends UseCaseContract {
  #apiKeyRepository;
  #workbenchRepository;
  #apiKeyFactory;

  constructor({ apiKeyRepository, workbenchRepository, apiKeyFactory }) {
    super();
    this.#apiKeyRepository = apiKeyRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#apiKeyFactory = apiKeyFactory;
  }

  async execute({ userId, name, workbenchId, expiresAt, scopes }) {
    if (workbenchId) {
      const workbench = await this.#workbenchRepository.findById(workbenchId);
      if (!workbench) {
        throw new Error("Workbench not found");
      }
      
      const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();
      if (ownerId !== userId.toString()) {
        throw new Error("Only the owner of the workbench can generate API keys for it");
      }
    }

    const key = `ah_${crypto.randomBytes(24).toString("hex")}`;
    
    const apiKeyEntity = this.#apiKeyFactory.create({
      key,
      userId,
      name,
      workbenchId,
      expiresAt,
      scopes
    });

    return await this.#apiKeyRepository.create(apiKeyEntity.toObject());
  }
}
