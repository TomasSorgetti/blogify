import { AlreadyExistsError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class RegisterUseCase extends UseCaseContract {
  #userRepository;
  #subscriptionRepository;
  #planRepository;
  #workbenchRepository;
  #hashService;
  #jwtService;
  #emailService;
  #eventBus;
  #userFactory;
  #subscriptionFactory;
  #workbenchFactory;
  #env;

  constructor({
    userRepository,
    subscriptionRepository,
    planRepository,
    workbenchRepository,
    hashService,
    jwtService,
    emailService,
    eventBus,
    userFactory,
    subscriptionFactory,
    workbenchFactory,
    env,
  }) {
    super();
    this.#userRepository = userRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#hashService = hashService;
    this.#jwtService = jwtService;
    this.#emailService = emailService;
    this.#eventBus = eventBus;
    this.#userFactory = userFactory;
    this.#subscriptionFactory = subscriptionFactory;
    this.#workbenchFactory = workbenchFactory;
    this.#env = env;
  }

  async execute({ username, email, password, workbench, preferences }) {
    const existingUser = await this.#userRepository.findByEmail(email);
    if (existingUser) {
      throw new AlreadyExistsError("User already exists");
    }

    const hashedPassword = await this.#hashService.hash(password);

    const userEntity = this.#userFactory.create({
      username,
      email,
      password: hashedPassword,
      // preferences,
    });
    // Add email login method
    userEntity.addLoginMethod({ provider: "email", addedAt: new Date() });

    const newUser = await this.#userRepository.create(userEntity.toObject());

    const freePlan = await this.#planRepository.findByName("Free Plan");

    const verificationToken = this.#jwtService.signCode(newUser._id);
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    const subscriptionEntity = this.#subscriptionFactory.create({
      userId: newUser._id,
      planId: freePlan._id,
    });

    const newSubscription = await this.#subscriptionRepository.create(
      subscriptionEntity.toObject(),
    );

    const workbenchEntity = this.#workbenchFactory.create({
      name: workbench || "Default Workspace",
      description: "This is your default workspace.",
      owner: newUser._id,
      members: [{ userId: newUser._id, role: "owner" }],
    });

    await this.#workbenchRepository.create(workbenchEntity.toObject());

    await this.#userRepository.update(newUser._id, {
      subscription: newSubscription._id,
      verificationToken,
      verificationTokenExpires,
    });

    await this.#eventBus.publish("events:emails", "EMAIL_REQUESTED", {
      to: newUser.email,
      subject: "Verify your email",
      template: "VERIFY_EMAIL",
      context: {
        username: newUser.username,
        verificationUrl: `${this.#env.FRONT_URL}/auth/confirm-email?token=${verificationToken}`,
      },
    });

    return {
      username: newUser.username,
      email: newUser.email,
      tokenExpiresIn: verificationTokenExpires,
    };
  }
}
