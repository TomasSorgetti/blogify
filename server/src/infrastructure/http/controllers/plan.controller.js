import successResponse from "../utils/success-response.js";

export default class PlanController {
  #getAllPlansUseCase;
  constructor({ getAllPlansUseCase }) {
    this.#getAllPlansUseCase = getAllPlansUseCase;
  }

  async getAll(req, res) {
    const data = await this.#getAllPlansUseCase.execute();

    return successResponse(res, data, "Plans retrieved successfully", 200);
  }

  async create(req, res) {
    const userId = req.user._id;

    const data = { userId };

    return successResponse(res, data, "Plan created successfully", 200);
  }
}
