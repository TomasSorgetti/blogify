import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetAllSessionsUseCase extends UseCaseContract {
  #sessionRepository;
  #sessionFactory;

  constructor({ sessionRepository, sessionFactory }) {
    super();
    this.#sessionRepository = sessionRepository;
    this.#sessionFactory = sessionFactory;
  }

  async execute(userId) {
    const sessions = await this.#sessionRepository.findByUserId(userId);

    return sessions.map((s) => this.#sessionFactory.create(s).sanitized());
  }
}
