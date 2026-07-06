import successResponse from "../../http/utils/success-response.js";

export default class WorkbenchController {
  #createWorkbenchUseCase;
  #getAllWorkbenchesUseCase;
  #updateWorkbenchUseCase;
  #deleteWorkbenchUseCase;
  #addMemberUseCase;
  #removeMemberUseCase;
  #updateMemberRoleUseCase;
  #getWorkbenchActivityUseCase;

  constructor({
    createWorkbenchUseCase,
    getAllWorkbenchesUseCase,
    updateWorkbenchUseCase,
    deleteWorkbenchUseCase,
    addMemberUseCase,
    removeMemberUseCase,
    updateMemberRoleUseCase,
    getWorkbenchActivityUseCase,
  }) {
    this.#createWorkbenchUseCase = createWorkbenchUseCase;
    this.#getAllWorkbenchesUseCase = getAllWorkbenchesUseCase;
    this.#updateWorkbenchUseCase = updateWorkbenchUseCase;
    this.#deleteWorkbenchUseCase = deleteWorkbenchUseCase;
    this.#addMemberUseCase = addMemberUseCase;
    this.#removeMemberUseCase = removeMemberUseCase;
    this.#updateMemberRoleUseCase = updateMemberRoleUseCase;
    this.#getWorkbenchActivityUseCase = getWorkbenchActivityUseCase;
  }

  async getAllWorkbenches(req, res) {
    const user = req.user;

    const data = await this.#getAllWorkbenchesUseCase.execute(user._id);

    return successResponse(res, data, "Workbenches retrieved successfully", 200);
  }

  async createWorkbench(req, res) {
    const user = req.user;
    const { name, description, colaborators } = req.body;

    const data = await this.#createWorkbenchUseCase.execute({
      userId: user._id,
      name,
      description,
      colaborators,
    });

    return successResponse(res, data, "Workbench created successfully", 201);
  }

  async updateWorkbench(req, res) {
    const user = req.user;
    const { workbenchId } = req.params;
    const { name, description } = req.body;

    const data = await this.#updateWorkbenchUseCase.execute({
      userId: user._id,
      workbenchId,
      name,
      description,
    });

    return successResponse(res, data, "Workbench updated successfully", 200);
  }

  async deleteWorkbench(req, res) {
    const user = req.user;
    const { workbenchId } = req.params;

    const data = await this.#deleteWorkbenchUseCase.execute({
      userId: user._id,
      workbenchId,
    });

    return successResponse(res, data, "Workbench deleted successfully", 200);
  }

  async addMember(req, res) {
    const user = req.user;
    const { workbenchId } = req.params;
    const { userId, role } = req.body;

    const data = await this.#addMemberUseCase.execute({
      userId: user._id,
      workbenchId,
      targetUserId: userId,
      role,
    });

    return successResponse(res, data, "Member added successfully", 200);
  }

  async removeMember(req, res) {
    const user = req.user;
    const { workbenchId, targetUserId } = req.params;

    const data = await this.#removeMemberUseCase.execute({
      userId: user._id,
      workbenchId,
      targetUserId,
    });

    return successResponse(res, data, "Member removed successfully", 200);
  }

  async updateMemberRole(req, res) {
    const user = req.user;
    const { workbenchId, targetUserId } = req.params;
    const { role } = req.body;

    const data = await this.#updateMemberRoleUseCase.execute({
      userId: user._id,
      workbenchId,
      targetUserId,
      role,
    });

    return successResponse(res, data, "Member role updated successfully", 200);
  }

  async getActivity(req, res) {
    const user = req.user;
    const { workbenchId } = req.params;

    const data = await this.#getWorkbenchActivityUseCase.execute(user._id, workbenchId);

    return successResponse(res, data, "Activity retrieved successfully", 200);
  }
}
