import { UseCaseContract } from "../../../domain/contracts/application/usecase.contract.js";

export default class CacheInvalidationDecorator extends UseCaseContract {
  #useCase;
  #cacheService;
  #tagsGenerator;

  constructor({ useCase, cacheService, tagsGenerator }) {
    super();
    this.#useCase = useCase;
    this.#cacheService = cacheService;
    this.#tagsGenerator = tagsGenerator;
  }

  async execute(...args) {
    const result = await this.#useCase.execute(...args);

    const tags = this.#tagsGenerator(...args, result);
    if (tags && tags.length > 0) {
      console.log(`[Cache] Invalidating tags: ${tags.join(", ")}`);
      await this.#cacheService.invalidate(tags);
    }

    return result;
  }
}
