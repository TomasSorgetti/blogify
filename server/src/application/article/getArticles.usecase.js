import mongoose from "mongoose";
import { InvalidInputError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetArticlesUseCase extends UseCaseContract {
  #articleRepository;

  constructor({
    articleRepository,
  }) {
    super();
    this.#articleRepository = articleRepository;
  }

  async execute(filters = {}, workbenchId, { page = 1, limit = 10 } = {}) {
    if (!workbenchId || !mongoose.isValidObjectId(workbenchId)) {
      throw new InvalidInputError("A valid workbenchId is required to list articles");
    }

    const skip = (page - 1) * limit;

    const { items, total } = await this.#articleRepository.findAllByWorkbench(
      filters,
      workbenchId,
      {
        skip,
        limit,
      }
    );

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
