import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class UpdateCategoryUseCase extends UseCaseContract {
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

  async execute({ userId, id, name }) {
    const updatedCategory = await this.#categoryRepository.update(id, userId, {
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
    });

    if (!updatedCategory) {
      throw new NotFoundError("Category not found or does not belong to user");
    }

    // if (this.#redisService) {
    //   const cacheKey = `categories:${userId}`;
    //   await this.#redisService.del(cacheKey);
    // }

    return updatedCategory;
  }
}
