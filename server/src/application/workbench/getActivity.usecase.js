import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";

export default class GetWorkbenchActivityUseCase extends UseCaseContract {
  #activityLogRepository;
  #workbenchRepository;

  constructor({ activityLogRepository, workbenchRepository }) {
    super();
    this.#activityLogRepository = activityLogRepository;
    this.#workbenchRepository = workbenchRepository;
  }

  async execute(userId, workbenchId) {
    const workbenchObj = await this.#workbenchRepository.findById(workbenchId);
    if (!workbenchObj) throw new NotFoundError("Workbench not found");

    const isMember = workbenchObj.members.some(
      (m) =>
        m.userId.toString() === userId.toString() ||
        m.userId?._id?.toString() === userId.toString(),
    );

    if (!isMember) {
      throw new Error(
        "You do not have permission to view activity in this workbench",
      );
    }

    return await this.#activityLogRepository.findByWorkbench(workbenchId);
  }
}
