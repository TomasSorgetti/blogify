import GetAllSessionsUseCase from "../../../../application/session/getAll.usecase.js";
import DeleteAllSessionsUseCase from "../../../../application/session/deleteAll.usecase.js";
import DeleteSessionUseCase from "../../../../application/session/delete.usecase.js";

export const registerSessionUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "getAllSessionsUseCase",
    new GetAllSessionsUseCase({
      sessionRepository: resolveDependency("sessionRepository"),
      sessionFactory: resolveDependency("sessionFactory"),
    }),
  );
  container.register(
    "deleteAllSessionsUseCase",
    new DeleteAllSessionsUseCase({
      sessionRepository: resolveDependency("sessionRepository"),
    }),
  );
  container.register(
    "deleteSessionUseCase",
    new DeleteSessionUseCase({
      sessionRepository: resolveDependency("sessionRepository"),
    }),
  );
};
