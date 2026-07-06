import UserController from "../../../../infrastructure/modules/user/user.controller.js";

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
