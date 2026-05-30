import { UseCaseContract } from "../../../domain/contracts/application/usecase.contract.js";

export default class CacheQueryDecorator extends UseCaseContract {
  #useCase;
  #cacheService;
  #keyGenerator;
  #ttl;
  #tags;

  constructor({ useCase, cacheService, keyGenerator, ttl = 3600, tags = [] }) {
    super();
    this.#useCase = useCase;
    this.#cacheService = cacheService;
    this.#keyGenerator = keyGenerator;
    this.#ttl = ttl;
    this.#tags = tags;
  }

  async execute(...args) {
    const key = this.#keyGenerator(...args);

    const cachedData = await this.#cacheService.get(key);
    if (cachedData) {
      console.log(`[Cache] Hit for key: ${key}`);
      return cachedData;
    }

    console.log(`[Cache] Miss for key: ${key}. Executing use case...`);

    const result = await this.#useCase.execute(...args);

    if (result) {
      const tags = typeof this.#tags === "function" ? this.#tags(...args) : this.#tags;
      await this.#cacheService.set(key, result, {
        ttl: this.#ttl,
        tags,
      });
    }

    return result;
  }
}
