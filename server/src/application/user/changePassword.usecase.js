import { NotFoundError, InvalidInputError } from "../../domain/errors/index.js";
import ERROR_CODES from "../../domain/errors/errorCodes.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class ChangePasswordUseCase extends UseCaseContract {
  #userRepository;
  #hashService;

  constructor({ userRepository, hashService }) {
    super();
    this.#userRepository = userRepository;
    this.#hashService = hashService;
  }

  async execute(userId, { currentPassword, newPassword }) {
    const user = await this.#userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!user.password) {
      throw new InvalidInputError("This account does not have a password (Oauth?)", {
        field: "currentPassword",
        code: ERROR_CODES.VALIDATION.INVALID_INPUT,
      });
    }

    const isCorrect = await this.#hashService.compare(currentPassword, user.password);
    if (!isCorrect) {
      throw new InvalidInputError("Current password is incorrect", {
        field: "currentPassword",
        code: ERROR_CODES.VALIDATION.INVALID_INPUT,
      });
    }

    if (newPassword.length < 8) {
      throw new InvalidInputError("New password must be at least 8 characters", {
        field: "newPassword",
        code: ERROR_CODES.VALIDATION.INVALID_INPUT,
      });
    }

    const hashedPassword = await this.#hashService.hash(newPassword);
    await this.#userRepository.update(userId, { password: hashedPassword });

    return { success: true };
  }
}
