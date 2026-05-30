import HashService from "../../../infrastructure/security/hash.js";
import JWTService from "../../../infrastructure/security/jwt.js";
import EmailService from "../../../infrastructure/services/email/service.js";
import SocketService from "../../../infrastructure/services/socket/service.js";
import StripeService from "../../../infrastructure/services/stripe/service.js";
import GoogleAuthStrategy from "../../../infrastructure/strategies/google.strategy.js";
import { storageFactory } from "../../../infrastructure/storage/index.js";
import RateLimiterService from "../../../infrastructure/services/ratelimiter/service.js";
import RedisService from "../../../infrastructure/services/cache/service.js";

export const registerServices = (container, config) => {
  const hashService = new HashService({
    saltRounds: config.env.HASH_SALT_ROUNDS,
  });
  const jwtService = new JWTService({
    accessSecret: config.env.JWT_ACCESS_SECRET,
    refreshSecret: config.env.JWT_REFRESH_SECRET,
  });
  const emailService = new EmailService(config.email);
  
  const emailQueueService = config.queues.emailQueueService;
  const eventBus = config.queues.eventBus;
  
  const redisService = new RedisService(config.redisCacheClient);

  const socketService = new SocketService();
  const stripeService = new StripeService(config.stripe);
  const storageService = storageFactory(config);
  const googleAuthStrategy = new GoogleAuthStrategy({
    clientId: config.env.GOOGLE_CLIENT_ID,
  });
  const rateLimiterService = new RateLimiterService();

  container.register("hashService", hashService);
  container.register("jwtService", jwtService);
  container.register("emailService", emailService);
  container.register("emailQueueService", emailQueueService);
  container.register("eventBus", eventBus);
  container.register("redisService", redisService);
  container.register("socketService", socketService);
  container.register("stripeService", stripeService);
  container.register("storageService", storageService);
  container.register("googleAuthStrategy", googleAuthStrategy);
  container.register("rateLimiterService", rateLimiterService);
  container.register("aiClient", config.aiClient);
};
