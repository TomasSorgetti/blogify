import SessionController from "../../../../infrastructure/http/controllers/session.controller.js";

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
