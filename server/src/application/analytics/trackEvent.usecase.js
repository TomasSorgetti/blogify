import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class TrackEventUseCase extends UseCaseContract {
  #analyticsRepository;

  constructor({ analyticsRepository }) {
    super();
    this.#analyticsRepository = analyticsRepository;
  }

  async execute({ userId, articleId, apiKeyId, workbenchId, type, metadata }) {
    return await this.#analyticsRepository.track({
      userId,
      articleId,
      apiKeyId,
      workbenchId,
      type,
      metadata,
      createdAt: new Date(),
    });
  }
}
