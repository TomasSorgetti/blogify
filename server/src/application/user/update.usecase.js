import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class UpdateProfileUseCase extends UseCaseContract {
  #userRepository;
  #storageService;
  #userFactory;

  constructor({ userRepository, storageService, userFactory }) {
    super();
    this.#userRepository = userRepository;
    this.#storageService = storageService;
    this.#userFactory = userFactory;
  }

  async execute(userId, userData, file) {
    try {
      const existingUser = await this.#userRepository.findById(userId);
      if (!existingUser) throw new NotFoundError("User not found");

      const validatedData = this.#userFactory.validateUpdate(userData);
      let avatarUrl = null;

      if (file) {
        const uploadResult = await this.#storageService.update(
          file,
          existingUser.avatar,
          "users",
          { width: 300, height: 300 }
        );
        avatarUrl = uploadResult.url;
      }

      const updateData = {
        ...validatedData,
        ...(avatarUrl && { avatar: avatarUrl }),
      };

      const updatedUser = await this.#userRepository.update(userId, updateData);
      if (!updatedUser) throw new NotFoundError("User not found");

      return this.#userFactory.create(updatedUser).sanitized();
    } catch (error) {
      throw error;
    }
  }
}
