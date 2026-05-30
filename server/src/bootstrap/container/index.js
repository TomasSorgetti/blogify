import Container from "./container.js";
import { registerServices } from "./modules/services.module.js";
import { registerRepositories } from "./modules/repositories/index.js";
import { registerUseCases } from "./modules/usecases/index.js";
import { registerControllers } from "./modules/controllers/index.js";
import { registerMiddlewares } from "./modules/middlewares.module.js";
import { registerFactories } from "./modules/factories/index.js";

export const createContainer = (config) => {
  const container = new Container();

  container.registerModule(registerServices, config);
  container.registerModule(registerRepositories, config);
  container.registerModule(registerFactories, config);
  container.registerModule(registerUseCases, config);
  container.registerModule(registerControllers, config);
  container.registerModule(registerMiddlewares, config);

  return container;
};
