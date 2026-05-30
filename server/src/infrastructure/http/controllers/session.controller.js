import successResponse from "../utils/success-response.js";

export default class SessionController {
  #getAllSessionsUseCase;
  #deleteAllSessionsUseCase;
  #deleteSessionUseCase;

  constructor({
    getAllSessionsUseCase,
    deleteAllSessionsUseCase,
    deleteSessionUseCase,
  }) {
    this.#getAllSessionsUseCase = getAllSessionsUseCase;
    this.#deleteAllSessionsUseCase = deleteAllSessionsUseCase;
    this.#deleteSessionUseCase = deleteSessionUseCase;
  }

  async getAll(req, res) {
    const user = req.user;

    const data = await this.#getAllSessionsUseCase.execute(user._id);

    return successResponse(res, data, "Sessions retrieved successfully", 200);
  }

  async getSession(req, res) {
    const data = {};
    return successResponse(res, data, "Session retrieved successfully", 200);
  }

  async deleteAll(req, res) {
    const user = req.user;

    await this.#deleteAllSessionsUseCase.execute(user._id);

    return successResponse(res, null, "Sessions deleted successfully", 201);
  }

  async delete(req, res) {
    const { _id: userId } = req.user;
    const { id: sessionId } = req.params;

    await this.#deleteSessionUseCase.execute({ userId, sessionId });

    return successResponse(res, null, "Session deleted successfully", 200);
  }
}
