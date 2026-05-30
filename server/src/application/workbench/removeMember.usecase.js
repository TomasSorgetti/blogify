import { ForbiddenError, NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class RemoveMemberUseCase extends UseCaseContract {
  #workbenchRepository;

  constructor({ workbenchRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
  }

  async execute({ userId, workbenchId, targetUserId }) {
    const workbench = await this.#workbenchRepository.findById(workbenchId);

    if (!workbench) {
      throw new NotFoundError("Workbench not found");
    }

    const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();

    if (userId !== ownerId && userId !== targetUserId) {
      throw new ForbiddenError("You can only remove yourself from a workbench unless you are the owner");
    }

    if (ownerId === targetUserId) {
      throw new ForbiddenError("The owner cannot be removed. Delete the workspace instead.");
    }

    const initialLength = workbench.members.length;
    workbench.members = workbench.members.filter(
      (m) => m.userId.toString() !== targetUserId && m.userId?._id?.toString() !== targetUserId
    );

    if (workbench.members.length === initialLength) {
      throw new NotFoundError("User is not a member of this workbench");
    }

    return await this.#workbenchRepository.update(workbenchId, { members: workbench.members });
  }
}
