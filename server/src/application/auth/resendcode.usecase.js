import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
import { NotFoundError, UnauthorizedError } from "../../domain/errors/index.js";

export default class ResendCodeUseCase extends UseCaseContract {
  #userRepository;
  #jwtService;
  #eventBus;
  #env;

  constructor({ userRepository, jwtService, eventBus, env }) {
    super();
    this.#userRepository = userRepository;
    this.#jwtService = jwtService;
    this.#eventBus = eventBus;
    this.#env = env;
  }

  async execute({ email }) {
    const user = await this.#userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");

    if (user.isVerified) {
      throw new UnauthorizedError("User is already verified");
    }

    const verificationToken = this.#jwtService.signCode(user._id);
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    await this.#userRepository.update(user._id, {
      verificationToken,
      verificationTokenExpires,
    });

    await this.#eventBus.publish("events:emails", "EMAIL_REQUESTED", {
      to: user.email,
      subject: "Verify your email",
      template: "VERIFY_EMAIL",
      context: {
        username: user.username,
        verificationUrl: `${this.#env.FRONT_URL}/auth/confirm-email?token=${verificationToken}`,
      },
    });

    return { tokenExpiresIn: verificationTokenExpires };
  }
}
