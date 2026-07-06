import SessionController from "../../../../infrastructure/modules/session/session.controller.js";

export const registerSessionControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "sessionController",
    new SessionController({
      getAllSessionsUseCase: resolveDependency("getAllSessionsUseCase"),
      deleteAllSessionsUseCase: resolveDependency("deleteAllSessionsUseCase"),
      deleteSessionUseCase: resolveDependency("deleteSessionUseCase"),
    }),
  );
};
