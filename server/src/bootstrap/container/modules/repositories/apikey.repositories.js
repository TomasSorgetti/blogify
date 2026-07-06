import ApiKeyRepository from "../../../../infrastructure/modules/apikey/apikey.repository.js";

export const registerApiKeyRepository = (container, models) => {
  container.register("apiKeyRepository", new ApiKeyRepository(models.ApiKey));
};
