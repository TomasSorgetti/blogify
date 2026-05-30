import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class getAllWorkbenchesUseCase extends UseCaseContract {
  #workbenchRepository;
  #articleRepository;

  constructor({ workbenchRepository, articleRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
    this.#articleRepository = articleRepository;
  }

  async execute(userId) {
    const workbenches = await this.#workbenchRepository.findByUserId(userId);
    
    const workbenchesWithCount = await Promise.all(
      workbenches.map(async (workbench) => {
        const count = await this.#articleRepository.countByWorkbench(workbench._id);
        return {
          ...workbench,
          articlesCount: count,
        };
      })
    );

    return workbenchesWithCount;
  }
}
