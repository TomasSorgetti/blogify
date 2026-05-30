import { ForbiddenError, NotFoundError, InvalidInputError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class UpdateMemberRoleUseCase extends UseCaseContract {
  #workbenchRepository;

  constructor({ workbenchRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
  }

  async execute({ userId, workbenchId, targetUserId, role }) {
    const validRoles = ["editor", "viewer"];
    if (!validRoles.includes(role)) {
      throw new InvalidInputError(`Invalid role. Allowed roles: ${validRoles.join(", ")}`);
    }

    const workbench = await this.#workbenchRepository.findById(workbenchId);

    if (!workbench) {
      throw new NotFoundError("Workbench not found");
    }

    const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();

    if (ownerId !== userId) {
      throw new ForbiddenError("Only the owner can update member roles");
    }

    if (ownerId === targetUserId) {
      throw new ForbiddenError("The owner's role cannot be changed");
    }

    let memberFound = false;
    workbench.members = workbench.members.map((m) => {
      const mId = m.userId._id?.toString() || m.userId.toString();
      if (mId === targetUserId) {
        memberFound = true;
        return { ...m, role };
      }
      return m;
    });

    if (!memberFound) {
      throw new NotFoundError("User is not a member of this workbench");
    }

    return await this.#workbenchRepository.update(workbenchId, { members: workbench.members });
  }
}
