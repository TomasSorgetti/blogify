import { ForbiddenError, NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class UpdateWorkbenchUseCase extends UseCaseContract {
  #workbenchRepository;

  constructor({ workbenchRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
  }

  async execute({ userId, workbenchId, name, description }) {
    const workbench = await this.#workbenchRepository.findById(workbenchId);

    if (!workbench) {
      throw new NotFoundError("Workbench not found");
    }

    const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();

    if (ownerId !== userId) {
      throw new ForbiddenError("Only the owner can update this workbench");
    }

    return await this.#workbenchRepository.update(workbenchId, { name, description });
  }
}
