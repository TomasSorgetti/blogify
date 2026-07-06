import express from "express";
import AuthValidation from "../../http/middlewares/validators/auth.validators.js";
import catchAsync from "../../http/utils/async-handler.js";

export default class AuthRouter {
  #router;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ authController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();

    this.#controller = authController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    /**
     * @POST /api/auth/login
     */
    this.#router.post(
      "/login",
      this.#rateLimiterMiddleware.handleAuth(),
      AuthValidation.login().handle,
      catchAsync(this.#controller.login.bind(this.#controller)),
    );

    /**
     * @POST /api/auth/register
     */
    this.#router.post(
      "/register",
      this.#rateLimiterMiddleware.handleAuth(),
      AuthValidation.register().handle,
      catchAsync(this.#controller.register.bind(this.#controller)),
    );

    /**
     * @POST /api/auth/verify
     */
    this.#router.post(
      "/verify",
      AuthValidation.verify().handle,
      catchAsync(this.#controller.verifyEmail.bind(this.#controller)),
    );

    /**
     * @POST /api/auth/resend-code
     */
    this.#router.post(
      "/resend-code",
      AuthValidation.resendCode().handle,
      catchAsync(
        this.#controller.resendVerificationCode.bind(this.#controller),
      ),
    );

    /**
     * @POST /api/auth/refresh
     */
    this.#router.post(
      "/refresh",
      catchAsync(this.#controller.refreshToken.bind(this.#controller)),
    );

    /**
     * @POST /api/auth/logout
     */
    this.#router.post(
      "/logout",
      this.#authMiddleware,
      catchAsync(this.#controller.logout.bind(this.#controller)),
    );

    /**
     * @POST /api/auth/google
     */
    this.#router.post(
      "/google",
      catchAsync(this.#controller.loginWithGoogle.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
