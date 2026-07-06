import AuthController from "../../../../infrastructure/modules/auth/auth.controller.js";

export const registerAuthControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "authController",
    new AuthController({
      loginUseCase: resolveDependency("loginUseCase"),
      registerUseCase: resolveDependency("registerUseCase"),
      verifyUseCase: resolveDependency("verifyUseCase"),
      logoutUseCase: resolveDependency("logoutUseCase"),
      refreshUseCase: resolveDependency("refreshUseCase"),
      loginWithGoogleUseCase: resolveDependency("loginWithGoogleUseCase"),
      resendCodeUseCase: resolveDependency("resendCodeUseCase"),
    }),
  );
};
