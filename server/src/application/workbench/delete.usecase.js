import { ForbiddenError, NotFoundError, AlreadyExistsError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class DeleteWorkbenchUseCase extends UseCaseContract {
  #workbenchRepository;
  #articleRepository;

  constructor({ workbenchRepository, articleRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
    this.#articleRepository = articleRepository;
  }

  async execute({ userId, workbenchId }) {
    const workbench = await this.#workbenchRepository.findById(workbenchId);

    if (!workbench) {
      throw new NotFoundError("Workbench not found");
    }

    const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();

    if (ownerId !== userId) {
      throw new ForbiddenError("Only the owner can delete this workbench");
    }

    const articleCount = await this.#articleRepository.countByWorkbench(workbenchId);

    if (articleCount > 0) {
      throw new AlreadyExistsError(
        `This workspace contains ${articleCount} article${articleCount === 1 ? "" : "s"}. Please delete or move them before removing the workspace.`,
      );
    }

    return await this.#workbenchRepository.delete(workbenchId);
  }
}
