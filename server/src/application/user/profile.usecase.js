import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetProfileUseCase extends UseCaseContract {
  #userRepository;
  #userFactory;

  constructor({ userRepository, userFactory }) {
    super();
    this.#userRepository = userRepository;
    this.#userFactory = userFactory;
  }

  async execute(userId) {
    const user = await this.#userRepository.findById(userId);

    const userEntity = this.#userFactory.create(user);
    const sanitized = userEntity.sanitized();

    return sanitized;
  }
}
