import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class getAllCategoriesUseCase extends UseCaseContract {
  #categoryRepository;
  // #redisService;

  constructor({
    categoryRepository,
    // redisService
  }) {
    super();
    this.#categoryRepository = categoryRepository;
    // this.#redisService = redisService;
  }

  async execute({ userId }) {
    const cacheKey = `categories:${userId}`;

    // if (this.#redisService) {
    //   const cachedCategories = await this.#redisService.get(cacheKey);
    //   if (cachedCategories) {
    //     return cachedCategories;
    //   }
    // }

    const categories = await this.#categoryRepository.findAll({
      $or: [{ createdBy: userId }, { isGlobal: true }],
    });

    // if (this.#redisService) {
    //   await this.#redisService.set(cacheKey, categories, 3600);
    // }

    return categories;
  }
}
