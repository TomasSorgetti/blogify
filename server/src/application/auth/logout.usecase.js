import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class LogoutUseCase extends UseCaseContract {
  #sessionRepository;

  constructor({ sessionRepository }) {
    super();
    if (!sessionRepository) {
      throw new Error("sessionRepository is required");
    }
    this.#sessionRepository = sessionRepository;
  }

  async execute({ userId, sessionId }) {
    if (!sessionId) {
      throw new BadRequestError("No session provided");
    }

    if (!userId) {
      throw new BadRequestError("No user provided");
    }

    const session = await this.#sessionRepository.findById(sessionId);

    if (session.userId.toString() !== userId.toString()) {
      throw new UnauthorizedError("This session does not belong to you");
    }

    await this.#sessionRepository.deleteById(sessionId);

    return true;
  }
}
