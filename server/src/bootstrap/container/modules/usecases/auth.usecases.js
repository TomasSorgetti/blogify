import LoginUseCase from "../../../../application/auth/login.usecase.js";
import RegisterUseCase from "../../../../application/auth/register.usecase.js";
import VerifyUseCase from "../../../../application/auth/verify.usecase.js";
import LogoutUseCase from "../../../../application/auth/logout.usecase.js";
import RefreshUseCase from "../../../../application/auth/refresh.usecase.js";
import LoginWithGoogleUseCase from "../../../../application/auth/loginWithGoogle.usecase.js";

export const registerAuthUseCases = (container, config) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "loginUseCase",
    new LoginUseCase({
      userRepository: resolveDependency("userRepository"),
      sessionRepository: resolveDependency("sessionRepository"),
      jwtService: resolveDependency("jwtService"),
      hashService: resolveDependency("hashService"),
      userFactory: resolveDependency("userFactory"),
      sessionFactory: resolveDependency("sessionFactory"),
    }),
  );

  container.register(
    "registerUseCase",
    new RegisterUseCase({
      userRepository: resolveDependency("userRepository"),
      subscriptionRepository: resolveDependency("subscriptionRepository"),
      planRepository: resolveDependency("planRepository"),
      workbenchRepository: resolveDependency("workbenchRepository"),
      emailService: resolveDependency("emailService"),
      emailQueueService: resolveDependency("emailQueueService"),
      hashService: resolveDependency("hashService"),
      jwtService: resolveDependency("jwtService"),
      userFactory: resolveDependency("userFactory"),
      subscriptionFactory: resolveDependency("subscriptionFactory"),
      workbenchFactory: resolveDependency("workbenchFactory"),
      env: config.env,
    }),
  );

  container.register(
    "verifyUseCase",
    new VerifyUseCase({
      userRepository: resolveDependency("userRepository"),
      jwtService: resolveDependency("jwtService"),
    }),
  );

  container.register(
    "logoutUseCase",
    new LogoutUseCase({
      sessionRepository: resolveDependency("sessionRepository"),
    }),
  );

  container.register(
    "refreshUseCase",
    new RefreshUseCase({
      sessionRepository: resolveDependency("sessionRepository"),
      jwtService: resolveDependency("jwtService"),
      hashService: resolveDependency("hashService"),
      userRepository: resolveDependency("userRepository"),
    }),
  );

  container.register(
    "loginWithGoogleUseCase",
    new LoginWithGoogleUseCase({
      userRepository: resolveDependency("userRepository"),
      sessionRepository: resolveDependency("sessionRepository"),
      subscriptionRepository: resolveDependency("subscriptionRepository"),
      planRepository: resolveDependency("planRepository"),
      workbenchRepository: resolveDependency("workbenchRepository"),
      jwtService: resolveDependency("jwtService"),
      hashService: resolveDependency("hashService"),
      googleStrategy: resolveDependency("googleAuthStrategy"),
      notificationRepository: resolveDependency("notificationRepository"),
      socketService: resolveDependency("socketService"),
      storageService: resolveDependency("storageService"),
      userFactory: resolveDependency("userFactory"),
      sessionFactory: resolveDependency("sessionFactory"),
      subscriptionFactory: resolveDependency("subscriptionFactory"),
      notificationFactory: resolveDependency("notificationFactory"),
      workbenchFactory: resolveDependency("workbenchFactory"),
    }),
  );
};
