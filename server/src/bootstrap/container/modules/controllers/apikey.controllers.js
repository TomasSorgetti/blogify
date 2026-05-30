import ApiKeyController from "../../../../infrastructure/http/controllers/apikey.controller.js";

export const registerApiKeyControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "apiKeyController",
    new ApiKeyController({
      createApiKeyUseCase: resolveDependency("createApiKeyUseCase"),
      invalidateApiKeyUseCase: resolveDependency("invalidateApiKeyUseCase"),
      listApiKeysUseCase: resolveDependency("listApiKeysUseCase"),
    }),
  );
};
