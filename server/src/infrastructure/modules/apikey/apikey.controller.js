import successResponse from "../../http/utils/success-response.js";

export default class ApiKeyController {
  #createApiKeyUseCase;
  #invalidateApiKeyUseCase;
  #listApiKeysUseCase;

  constructor({
    createApiKeyUseCase,
    invalidateApiKeyUseCase,
    listApiKeysUseCase,
  }) {
    this.#createApiKeyUseCase = createApiKeyUseCase;
    this.#invalidateApiKeyUseCase = invalidateApiKeyUseCase;
    this.#listApiKeysUseCase = listApiKeysUseCase;
  }

  async create(req, res) {
    const userId = req.user._id;
    const { name, workbenchId, expiresAt, scopes } = req.body;

    const result = await this.#createApiKeyUseCase.execute({
      userId,
      name,
      workbenchId,
      expiresAt,
      scopes,
    });

    return successResponse(res, result, "API Key created successfully", 201);
  }

  async invalidate(req, res) {
    const userId = req.user._id;
    const { key } = req.params;

    const result = await this.#invalidateApiKeyUseCase.execute({
      key,
      userId,
    });

    return successResponse(
      res,
      result,
      "API Key invalidated successfully",
      200,
    );
  }

  async getAllByCurrentUser(req, res) {
    const userId = req.user._id;
    const { workbenchId } = req.query;
    const result = await this.#listApiKeysUseCase.execute({ userId, workbenchId });

    return successResponse(res, result, "API Keys retrieved successfully", 200);
  }
}
