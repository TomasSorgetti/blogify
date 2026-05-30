import UserController from "../../../../infrastructure/http/controllers/user.controller.js";

export const registerUserControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "userController",
    new UserController({
      getProfileUseCase: resolveDependency("getProfileUseCase"),
      updateProfileUseCase: resolveDependency("updateProfileUseCase"),
      changePasswordUseCase: resolveDependency("changePasswordUseCase"),
      searchUsersUseCase: resolveDependency("searchUsersUseCase"),
    }),
  );
};
