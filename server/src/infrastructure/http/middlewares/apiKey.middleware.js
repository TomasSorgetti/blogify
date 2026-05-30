import { UnauthorizedError } from "../../../domain/errors/index.js";

export default class ApiKeyMiddleware {
  #apiKeyRepository;

  constructor({ apiKeyRepository }) {
    this.#apiKeyRepository = apiKeyRepository;
  }

  async handle(req, res, next) {
    try {
      const apiKeyHeader = req.headers["x-api-key"] || req.headers["X-API-KEY"];

      if (!apiKeyHeader) {
        throw new UnauthorizedError("API Key is missing (X-API-KEY header)");
      }

      const apiKey = await this.#apiKeyRepository.validate(apiKeyHeader);

      req.user = {
        _id: apiKey.userId.toString(),
        apiKeyId: apiKey._id || apiKey.id,
        workbenchId: apiKey.workbenchId ? apiKey.workbenchId.toString() : null,
        role: "user",
        viaApiKey: true,
        scopes: apiKey.scopes,
      };

      next();
    } catch (error) {
      next(new UnauthorizedError("Invalid or inactive API Key"));
    }
  }
}
