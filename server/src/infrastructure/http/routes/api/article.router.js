import express from "express";
import multer from "multer";
import ArticleValidation from "../../middlewares/validators/article.validators.js";
import catchAsync from "../../utils/async-handler.js";

export default class ArticleRouter {
  #router;
  #controller;
  #authMiddleware;
  #planLimitsMiddleware;
  #articleRepository;
  #rateLimiterMiddleware;
  #upload;

  constructor({
    articleController,
    authMiddleware,
    planLimitsMiddleware,
    articleRepository,
    rateLimiterMiddleware,
  }) {
    this.#router = express.Router();
    this.#controller = articleController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#planLimitsMiddleware = planLimitsMiddleware;
    this.#articleRepository = articleRepository;
    this.#rateLimiterMiddleware = rateLimiterMiddleware;
    this.#upload = multer({ storage: multer.memoryStorage() });

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/articles/
     * Public - Company articles for landing
     */
    this.#router.get(
      "/",
      ArticleValidation.getAll().handle,
      catchAsync(this.#controller.getGlobalArticles.bind(this.#controller)),
    );

    /**
     * @GET /api/articles/search
     * Public - Search company/public articles
     */
    this.#router.get(
      "/search",
      ArticleValidation.search().handle,
      catchAsync(this.#controller.search.bind(this.#controller)),
    );

    /**
     * @GET /api/articles/me
     * Auth - User articles in their workbench
     */
    this.#router.get(
      "/me",
      this.#authMiddleware,
      ArticleValidation.getAll().handle,
      catchAsync(this.#controller.getAll.bind(this.#controller)),
    );

    /**
     * @GET /api/articles/:slug
     * Public with optional info (increments views only if not admin)
     */
    this.#router.get(
      "/:slug",
      ArticleValidation.getBySlug().handle,
      catchAsync(this.#controller.getPostBySlug.bind(this.#controller)),
    );

    /**
     * @POST /api/articles/
     * Auth - Create article in a workbench
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#upload.single("image"),
      this.#planLimitsMiddleware.checkLimit("articlesPerWorkbench", (req) =>
        this.#articleRepository.countByWorkbench(req.body.workbench),
      ),
      ArticleValidation.create().handle,
      catchAsync(this.#controller.createPost.bind(this.#controller)),
    );

    /**
     * @POST /api/articles/generate-ai-article
     * Auth - Generate article with AI
     */
    this.#router.post(
      "/generate-ai-article",
      this.#authMiddleware,
      this.#planLimitsMiddleware.checkLimit("aiTools", async () => 0), // Use 0 to just trigger the "0 means no access" check if AI is false
      ArticleValidation.generateAiArticle().handle,
      catchAsync(this.#controller.generateAiArticle.bind(this.#controller)),
    );

    /**
     * @POST /api/articles/admin
     * Admin - Create company global article
     */
    this.#router.post(
      "/admin",
      this.#authMiddleware,
      this.#upload.single("image"),
      catchAsync(this.#controller.createPost.bind(this.#controller)), // logic handles isGlobal=true
    );

    /**
     * @PATCH /api/articles/:slug
     * Auth - Update article
     */
    this.#router.patch(
      "/:slug",
      this.#authMiddleware,
      this.#upload.single("image"),
      ArticleValidation.update().handle,
      catchAsync(this.#controller.updatePost.bind(this.#controller)),
    );

    /**
     * @DELETE /api/articles/:slug
     * Auth - Delete article
     */
    this.#router.delete(
      "/:slug",
      this.#authMiddleware,
      ArticleValidation.delete().handle,
      catchAsync(this.#controller.deletePost.bind(this.#controller)),
    );

    /**
     * @PATCH /api/articles/:slug/kanban-move
     * Auth - Move article in kanban
     */
    this.#router.patch(
      "/:slug/kanban-move",
      this.#authMiddleware,
      catchAsync(this.#controller.moveKanbanCard.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
