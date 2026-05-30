import CreateApiKeyUseCase from "../../../../application/apikey/createApiKey.usecase.js";
import InvalidateApiKeyUseCase from "../../../../application/apikey/invalidateApiKey.usecase.js";
import ListApiKeysUseCase from "../../../../application/apikey/listApiKeys.usecase.js";

export const registerApiKeyUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "createApiKeyUseCase",
    new CreateApiKeyUseCase({
      apiKeyRepository: resolveDependency("apiKeyRepository"),
      workbenchRepository: resolveDependency("workbenchRepository"),
      apiKeyFactory: resolveDependency("apiKeyFactory"),
    }),
  );

  container.register(
    "invalidateApiKeyUseCase",
    new InvalidateApiKeyUseCase({
      apiKeyRepository: resolveDependency("apiKeyRepository"),
    }),
  );

  container.register(
    "listApiKeysUseCase",
    new ListApiKeysUseCase({
      apiKeyRepository: resolveDependency("apiKeyRepository"),
    }),
  );
};
