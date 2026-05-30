import UserFactory from "../../../../domain/factories/user.factory.js";

export const registerUserFactory = (container) => {
  container.register("userFactory", new UserFactory());
};
