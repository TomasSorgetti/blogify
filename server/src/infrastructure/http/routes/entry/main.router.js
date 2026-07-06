import express from "express";

import AuthRouter from "../../../modules/auth/auth.router.js";
import UserRouter from "../../../modules/user/user.router.js";
import SessionRouter from "../../../modules/session/session.router.js";
import WorkbenchRouter from "../../../modules/workbench/workbench.router.js";
import ArticleRouter from "../../../modules/article/article.router.js";
import CategoryRouter from "../../../modules/category/category.router.js";
import SubscriptionRouter from "../../../modules/subscription/subscription.router.js";
import NotificationRouter from "../../../modules/notification/notification.router.js";
import PlanRouter from "../../../modules/plan/plan.router.js";
import ApiKeyRouter from "../../../modules/apikey/apikey.router.js";

class MainRouter {
  #router;

  constructor(dependencies = {}) {
    this.#router = express.Router();
    this.#setupRoutes(dependencies);
  }

  #setupRoutes(dependencies) {
    const authRouter = new AuthRouter({
      authController: dependencies.authController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const userRouter = new UserRouter({
      userController: dependencies.userController,
      authMiddleware: dependencies.authMiddleware,
      adminMiddleware: dependencies.adminMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const sessionRouter = new SessionRouter({
      sessionController: dependencies.sessionController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const workbenchRouter = new WorkbenchRouter({
      workbenchController: dependencies.workbenchController,
      authMiddleware: dependencies.authMiddleware,
      planLimitsMiddleware: dependencies.planLimitsMiddleware,
      workbenchRepository: dependencies.workbenchRepository,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const subscriptionRouter = new SubscriptionRouter({
      subscriptionController: dependencies.subscriptionController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const articleRouter = new ArticleRouter({
      articleController: dependencies.articleController,
      authMiddleware: dependencies.authMiddleware,
      planLimitsMiddleware: dependencies.planLimitsMiddleware,
      articleRepository: dependencies.articleRepository,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const categoryRouter = new CategoryRouter({
      categoryController: dependencies.categoryController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const notificationRouter = new NotificationRouter({
      notificationController: dependencies.notificationController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const planRouter = new PlanRouter({
      planController: dependencies.planController,
      authMiddleware: dependencies.authMiddleware,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });
    const apiKeyRouter = new ApiKeyRouter({
      apiKeyController: dependencies.apiKeyController,
      authMiddleware: dependencies.authMiddleware,
      planLimitsMiddleware: dependencies.planLimitsMiddleware,
      apiKeyRepository: dependencies.apiKeyRepository,
      rateLimiterMiddleware: dependencies.rateLimiterMiddleware,
    });

    this.#router.use("/auth", authRouter.getRouter());
    this.#router.use("/users", userRouter.getRouter());
    this.#router.use("/sessions", sessionRouter.getRouter());
    this.#router.use("/workbenches", workbenchRouter.getRouter());
    this.#router.use("/subscriptions", subscriptionRouter.getRouter());
    this.#router.use("/articles", articleRouter.getRouter());
    this.#router.use("/categories", categoryRouter.getRouter());
    this.#router.use("/notifications", notificationRouter.getRouter());
    this.#router.use("/plans", planRouter.getRouter());
    this.#router.use("/api-keys", apiKeyRouter.getRouter());
  }

  getRouter() {
    return this.#router;
  }
}

export default MainRouter;
