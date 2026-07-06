import express from "express";
import multer from "multer";
import catchAsync from "../../http/utils/async-handler.js";
import UserValidation from "../../http/middlewares/validators/user.validators.js";

export default class UserRouter {
  #router;
  #upload;
  #controller;
  #authMiddleware;
  #adminMiddleware;
  #rateLimiterMiddleware;

  constructor({ userController, authMiddleware, adminMiddleware, rateLimiterMiddleware }) {
    this.#router = express.Router();
    this.#upload = multer({ storage: multer.memoryStorage() });

    this.#controller = userController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#adminMiddleware = adminMiddleware.handle.bind(adminMiddleware);
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
      UserValidation.updateProfile().handle,
      catchAsync(this.#controller.updateProfile.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/me/password
     */
    this.#router.patch(
      "/me/password",
      this.#authMiddleware,
      UserValidation.changePassword().handle,
      catchAsync(this.#controller.changePassword.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/me/email
     */
    this.#router.patch(
      "/me/email",
      this.#authMiddleware,
      UserValidation.changeEmail().handle,
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
     * @GET /api/users/admin — Admin only
     */
    this.#router.get(
      "/admin",
      this.#authMiddleware,
      this.#adminMiddleware,
      catchAsync(this.#controller.getAllUsers.bind(this.#controller)),
    );
    /**
     * @GET /api/users/admin/:id — Admin only
     */
    this.#router.get(
      "/admin/:id",
      this.#authMiddleware,
      this.#adminMiddleware,
      catchAsync(this.#controller.getUserById.bind(this.#controller)),
    );
    /**
     * @POST /api/users/admin — Admin only
     */
    this.#router.post(
      "/admin",
      this.#authMiddleware,
      this.#adminMiddleware,
      UserValidation.adminCreateUser().handle,
      catchAsync(this.#controller.createUser.bind(this.#controller)),
    );
    /**
     * @DELETE /api/users/admin/:id — Admin only
     */
    this.#router.delete(
      "/admin/:id",
      this.#authMiddleware,
      this.#adminMiddleware,
      catchAsync(this.#controller.deleteUser.bind(this.#controller)),
    );
    /**
     * @PATCH /api/users/admin/:id/roles — Admin only
     */
    this.#router.patch(
      "/admin/:id/roles",
      this.#authMiddleware,
      this.#adminMiddleware,
      UserValidation.adminChangeRole().handle,
      catchAsync(this.#controller.changeRole.bind(this.#controller)),
    );
    /**
     * @DELETE /api/users/admin/:id/tokens — Admin only
     */
    this.#router.delete(
      "/admin/:id/tokens",
      this.#authMiddleware,
      this.#adminMiddleware,
      catchAsync(this.#controller.deleteSessions.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
