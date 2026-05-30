import ApiKeyRepository from "../../../../infrastructure/database/repositories/apikey.repository.js";

export const registerApiKeyRepository = (container, models) => {
  container.register("apiKeyRepository", new ApiKeyRepository(models.ApiKey));
};
