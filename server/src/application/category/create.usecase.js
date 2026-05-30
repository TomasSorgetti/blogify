import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class createCategoryUseCase extends UseCaseContract {
  #categoryRepository;
  #categoryFactory;

  constructor({ categoryRepository, categoryFactory }) {
    super();
    this.#categoryRepository = categoryRepository;
    this.#categoryFactory = categoryFactory;
  }

  async execute({ name, userId, isGlobal = false }) {
    const categoryEntity = this.#categoryFactory.create({
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
      createdBy: userId,
      isGlobal,
    });

    const category = await this.#categoryRepository.create(
      categoryEntity.toObject(),
    );

    return category;
  }
}
