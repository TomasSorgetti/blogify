export default class RateLimiterMiddleware {
  #rateLimiterService;

  constructor({ rateLimiterService }) {
    this.#rateLimiterService = rateLimiterService;
  }

  /**
   * General rate limiting middleware
   */
  handleGeneric() {
    return this.#rateLimiterService.getApiLimiter();
  }

  /**
   * Stricter rate limiting for auth endpoints
   */
  handleAuth() {
    return this.#rateLimiterService.getAuthLimiter();
  }
}
