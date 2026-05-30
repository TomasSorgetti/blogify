import { ForbiddenError, NotFoundError, AlreadyExistsError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class AddMemberUseCase extends UseCaseContract {
  #workbenchRepository;
  #userRepository;

  constructor({ workbenchRepository, userRepository }) {
    super();
    this.#workbenchRepository = workbenchRepository;
    this.#userRepository = userRepository;
  }

  async execute({ userId, workbenchId, targetUserId, role = "viewer" }) {
    const workbench = await this.#workbenchRepository.findById(workbenchId);

    if (!workbench) {
      throw new NotFoundError("Workbench not found");
    }

    const ownerId = workbench.owner._id?.toString() || workbench.owner.toString();

    if (ownerId !== userId) {
      throw new ForbiddenError("Only the owner can add members");
    }

    const targetUser = await this.#userRepository.findById(targetUserId);
    if (!targetUser) {
      throw new NotFoundError("User to add not found");
    }

    // Check if user is already a member
    const isAlreadyMember = workbench.members.some(
      (m) => m.userId.toString() === targetUserId || m.userId?._id?.toString() === targetUserId
    );

    if (isAlreadyMember) {
      throw new AlreadyExistsError("User is already a member of this workbench");
    }

    workbench.members.push({ userId: targetUserId, role });

    return await this.#workbenchRepository.update(workbenchId, { members: workbench.members });
  }
}
