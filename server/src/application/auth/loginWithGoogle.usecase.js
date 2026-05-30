import { NotFoundError, UnauthorizedError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class LoginWithGoogleUseCase extends UseCaseContract {
  #userRepository;
  #sessionRepository;
  #subscriptionRepository;
  #planRepository;
  #workbenchRepository;
  #jwtService;
  #hashService;
  #googleStrategy;
  #notificationRepository;
  #socketService;
  #storageService;
  #userFactory;
  #sessionFactory;
  #subscriptionFactory;
  #notificationFactory;
  #workbenchFactory;

  constructor({
    userRepository,
    sessionRepository,
    subscriptionRepository,
    planRepository,
    workbenchRepository,
    jwtService,
    hashService,
    googleStrategy,
    notificationRepository,
    socketService,
    storageService,
    userFactory,
    sessionFactory,
    subscriptionFactory,
    notificationFactory,
    workbenchFactory,
  }) {
    super();
    this.#userRepository = userRepository;
    this.#sessionRepository = sessionRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#jwtService = jwtService;
    this.#hashService = hashService;
    this.#googleStrategy = googleStrategy;
    this.#notificationRepository = notificationRepository;
    this.#socketService = socketService;
    this.#storageService = storageService;
    this.#userFactory = userFactory;
    this.#sessionFactory = sessionFactory;
    this.#subscriptionFactory = subscriptionFactory;
    this.#notificationFactory = notificationFactory;
    this.#workbenchFactory = workbenchFactory;
  }

  async #downloadAndUploadAvatar(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const buffer = Buffer.from(await response.arrayBuffer());
      const mimetype = response.headers.get("content-type");
      const originalname = url.split("/").pop() || "avatar.jpg";

      const file = {
        buffer,
        mimetype,
        originalname,
      };

      const result = await this.#storageService.upload(file, "users", { width: 300, height: 300 });
      return result.url;
    } catch (error) {
      console.error("Failed to download Google avatar:", error);
      return null;
    }
  }

  async execute({ idToken, rememberme, userAgent, ip }) {
    const profile = await this.#googleStrategy.verify(idToken);

    if (!profile.emailVerified) {
      throw new UnauthorizedError("Google account not verified");
    }

    let userFound = await this.#userRepository.findByEmail(profile.email);

    if (!userFound) {
      let avatarKey = null;
      if (profile.avatar) {
        avatarKey = await this.#downloadAndUploadAvatar(profile.avatar);
      }

      const newUserEntity = this.#userFactory.createWithOAuth({
        username: profile.name.replace(/\s+/g, "").toLowerCase(),
        email: profile.email,
        avatar: avatarKey,
        provider: "google",
        providerId: profile.providerId,
      });

      const newUser = await this.#userRepository.create(
        newUserEntity.toObject(),
      );

      // Assign Free Plan
      const freePlan = await this.#planRepository.findByName("Free Plan");
      const subscriptionEntity = this.#subscriptionFactory.create({
        userId: newUser._id || newUser.id,
        planId: freePlan._id || freePlan.id,
      });

      const newSubscription = await this.#subscriptionRepository.create(
        subscriptionEntity.toObject(),
      );

      // Create Default Workspace
      const workbenchEntity = this.#workbenchFactory.create({
        name: "Default Workspace",
        description: "This is your default workspace.",
        owner: newUser._id || newUser.id,
        members: [{ userId: newUser._id || newUser.id, role: "owner" }],
      });

      await this.#workbenchRepository.create(workbenchEntity.toObject());

      // Update user with subscription reference
      userFound = await this.#userRepository.update(newUser._id || newUser.id, {
        subscription: newSubscription._id || newSubscription.id,
      });
    } else {
      const userEntity = this.#userFactory.create(userFound);
      const hasGoogleLogin = userEntity.hasLoginMethod("google");

      if (!hasGoogleLogin) {
        userEntity.addLoginMethod({
          provider: "google",
          providerId: profile.providerId,
          addedAt: new Date(),
        });

        const updateData = {
          loginMethods: userEntity.loginMethods,
        };

        if (!userEntity.avatar && profile.avatar) {
          updateData.avatar = await this.#downloadAndUploadAvatar(profile.avatar);
        }

        userFound = await this.#userRepository.update(
          userFound._id || userFound.id,
          updateData,
        );

        const notificationEntity = this.#notificationFactory.create({
          userId: userFound._id || userFound.id,
          type: "activity",
          message: `You have added Google as a login method.`,
        });

        try {
          const notification = await this.#notificationRepository.create(
            notificationEntity.toObject(),
          );
          this.#socketService.sendNotification(
            userFound._id || userFound.id,
            notification,
          );
        } catch (err) {
          console.error("Failed to send notification:", err);
        }
      }
    }

    const user = this.#userFactory.create(userFound);

    const refreshToken = this.#jwtService.signRefresh(user._id, rememberme);
    const { exp } = this.#jwtService.verifyRefresh(refreshToken);
    const expiresAt = new Date(exp * 1000);

    const hashedRefreshToken = await this.#hashService.hash(refreshToken);

    await this.#sessionRepository.deleteByDevice(user._id, userAgent, ip);

    const sessionEntity = this.#sessionFactory.create({
      userId: user._id,
      refreshToken: hashedRefreshToken,
      userAgent,
      ip,
      expiresAt,
    });

    const newSession = await this.#sessionRepository.create(
      sessionEntity.toObject(),
    );

    const accessToken = this.#jwtService.signAccess(
      user._id,
      newSession._id.toString(),
      rememberme,
      user.role,
    );

    await this.#userRepository.update(user._id, { lastLogin: new Date() });

    return {
      accessToken,
      refreshToken,
      user: user.sanitized(),
      sessionId: newSession._id,
    };
  }
}
