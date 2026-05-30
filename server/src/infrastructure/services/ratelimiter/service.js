import { rateLimit } from "express-rate-limit";

export default class RateLimiterService {
  #apiLimiter;
  #authLimiter;

  constructor() {
    this.#apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 300, // Limit each IP to 100 requests per `window`
      standardHeaders: "draft-7", // combined `RateLimit` header
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      message: {
        status: 429,
        message:
          "Too many requests from this IP, please try again after 15 minutes",
      },
    });

    this.#authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 15, // Limit each IP to 5 requests per `window`
      standardHeaders: "draft-7",
      legacyHeaders: false,
      message: {
        status: 429,
        message:
          "Too many login/registration attempts, please try again after 15 minutes",
      },
    });
  }

  getApiLimiter() {
    return this.#apiLimiter;
  }

  getAuthLimiter() {
    return this.#authLimiter;
  }
}
