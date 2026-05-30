import jwt from "jsonwebtoken";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
import {
  InvalidCredentialsError,
  NotFoundError,
  TokenExpiredError,
  UnauthorizedError,
} from "../../domain/errors/index.js";

export default class RefreshUseCase extends UseCaseContract {
  #sessionRepository;
  #jwtService;
  #hashService;
  #userRepository;

  constructor({ sessionRepository, jwtService, hashService, userRepository }) {
    super();
    if (!userRepository) {
      throw new Error("userRepository is required");
    }
    this.#sessionRepository = sessionRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
    this.#userRepository = userRepository;
  }

  async execute(refreshToken) {
    if (!refreshToken) {
      throw new InvalidCredentialsError("No Token provided");
    }

    let payload;

    try {
      payload = this.#jwtService.verifyRefresh(refreshToken);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError("Refresh token expired");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError("Invalid refresh token");
      } else {
        throw err;
      }
    }

    const sessions = await this.#sessionRepository.findByUserId(payload.userId);

    let session = null;
    for (const s of sessions) {
      if (await this.#hashService.verify(refreshToken, s.refreshToken)) {
        session = s;
        break;
      }
    }

    if (!session) {
      throw new UnauthorizedError("Session not found");
    }

    const user = await this.#userRepository.findById(payload.userId);
    const role = user?.role || "user";

    const newAccesToken = this.#jwtService.signAccess(
      payload.userId,
      session._id.toString(),
      payload.rememberMe,
      role,
    );

    const newRefreshToken = this.#jwtService.signRefresh(
      payload.userId,
      payload.rememberMe,
    );

    const newHashedRefreshToken = await this.#hashService.hash(newRefreshToken);

    await this.#sessionRepository.update(session._id, {
      refreshToken: newHashedRefreshToken,
    });

    return {
      newAccesToken,
      newRefreshToken,
    };
  }
}
