import GetProfileUseCase from "../../../../application/user/profile.usecase.js";
import UpdateProfileUseCase from "../../../../application/user/update.usecase.js";
import ChangePasswordUseCase from "../../../../application/user/changePassword.usecase.js";
import SearchUsersUseCase from "../../../../application/user/search.usecase.js";

export const registerUserUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "getProfileUseCase",
    new GetProfileUseCase({
      userRepository: resolveDependency("userRepository"),
      userFactory: resolveDependency("userFactory"),
    }),
  );

  container.register(
    "updateProfileUseCase",
    new UpdateProfileUseCase({
      userRepository: resolveDependency("userRepository"),
      storageService: resolveDependency("storageService"),
      userFactory: resolveDependency("userFactory"),
    }),
  );

  container.register(
    "changePasswordUseCase",
    new ChangePasswordUseCase({
      userRepository: resolveDependency("userRepository"),
      hashService: resolveDependency("hashService"),
    }),
  );

  container.register(
    "searchUsersUseCase",
    new SearchUsersUseCase({
      userRepository: resolveDependency("userRepository"),
    }),
  );
};
