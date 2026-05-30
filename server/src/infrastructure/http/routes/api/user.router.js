import express from "express";
import multer from "multer";
import catchAsync from "../../utils/async-handler.js";

export default class UserRouter {
  #router;
  #upload;
  #controller;
  #authMiddleware;
  #rateLimiterMiddleware;

  constructor({ userController, authMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();
    this.#upload = multer({ storage: multer.memoryStorage() });

    this.#controller = userController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/users/search
     */
    this.#router.get(
      "/search",
      this.#authMiddleware,
      catchAsync(this.#controller.searchUsers.bind(this.#controller)),
    );
    /**
     * @GET /api/users/me
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.profile.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/me
     */
    this.#router.patch(
      "/me",
      this.#authMiddleware,
      this.#upload.single("image"),
      catchAsync(this.#controller.updateProfile.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/me/password
     */
    this.#router.patch(
      "/me/password",
      this.#authMiddleware,
      catchAsync(this.#controller.changePassword.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/me/email
     */
    this.#router.patch(
      "/me/email",
      this.#authMiddleware,
      catchAsync(this.#controller.changeEmail.bind(this.#controller)),
    );
    /**
     * @DELETE /api/users/me
     */
    this.#router.delete(
      "/me",
      this.#authMiddleware,
      catchAsync(this.#controller.deleteProfile.bind(this.#controller)),
    );
    /**
     * @GET /api/users/all
     */
    this.#router.get(
      "/admin",
      catchAsync(this.#controller.getAllUsers.bind(this.#controller)),
    );
    /**
     * @GET /api/users/admin/:id
     */
    this.#router.get(
      "/admin/:id",
      catchAsync(this.#controller.getUserById.bind(this.#controller)),
    );
    /**
     * @POST /api/users/admin
     */
    this.#router.post(
      "/admin",
      catchAsync(this.#controller.createUser.bind(this.#controller)),
    );
    /**
     * @DELETE /api/users/admin/:id
     */
    this.#router.delete(
      "/admin/:id",
      catchAsync(this.#controller.deleteUser.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/admin/:id/roles
     */
    this.#router.patch(
      "/admin/:id/roles",
      catchAsync(this.#controller.changeRole.bind(this.#controller)),
    );
    /**
     * @DELETE /api/users/admin/:id/tokens
     */
    this.#router.delete(
      "/admin/:id/tokens",
      catchAsync(this.#controller.deleteSessions.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
