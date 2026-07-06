import UserRepository from "../../../../infrastructure/modules/user/user.repository.js";

export const registerUserRepository = (container, models) => {
  container.register("userRepository", new UserRepository(models.User));
};
