import ApiKeyFactory from "../../../../domain/factories/apikey.factory.js";

export const registerApiKeyFactory = (container) => {
  container.register("apiKeyFactory", new ApiKeyFactory());
};
