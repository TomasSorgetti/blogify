import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetGlobalArticlesUseCase extends UseCaseContract {
  #articleRepository;

  constructor({ articleRepository }) {
    super();
    this.#articleRepository = articleRepository;
  }

  async execute(filters = {}, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;

    const { items, total } = await this.#articleRepository.findAllGlobal(
      filters,
      { skip, limit },
    );

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
