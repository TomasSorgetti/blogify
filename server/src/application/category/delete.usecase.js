import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class DeleteCategoryUseCase extends UseCaseContract {
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

  async execute({ userId, id }) {
    const deletedCategory = await this.#categoryRepository.delete(id, userId);

    if (!deletedCategory) {
      throw new NotFoundError("Category not found or does not belong to user");
    }

    // if (this.#redisService) {
    //   const cacheKey = `categories:${userId}`;
    //   await this.#redisService.del(cacheKey);
    // }

    return deletedCategory;
  }
}
