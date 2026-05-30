import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class SearchUsersUseCase extends UseCaseContract {
  #userRepository;

  constructor({ userRepository }) {
    super();
    this.#userRepository = userRepository;
  }

  async execute(query) {
    if (!query || query.trim().length < 3) {
      return [];
    }

    const users = await this.#userRepository.search(query);
    return users;
  }
}
