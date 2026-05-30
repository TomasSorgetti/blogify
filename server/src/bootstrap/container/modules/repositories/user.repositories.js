import UserRepository from "../../../../infrastructure/database/repositories/user.repository.js";

export const registerUserRepository = (container, models) => {
  container.register("userRepository", new UserRepository(models.User));
};
