import successResponse from "../../http/utils/success-response.js";

export default class FetchController {
  #getArticlesUseCase;
  #getArticleUseCase;
  #getCategoriesUseCase;
  #trackEventUseCase;
  #getWorkbenchStatsUseCase;

  constructor({
    getArticlesUseCase,
    getArticleUseCase,
    getCategoriesUseCase,
    trackEventUseCase,
    getWorkbenchStatsUseCase,
  }) {
    this.#getArticlesUseCase = getArticlesUseCase;
    this.#getArticleUseCase = getArticleUseCase;
    this.#getCategoriesUseCase = getCategoriesUseCase;
    this.#trackEventUseCase = trackEventUseCase;
    this.#getWorkbenchStatsUseCase = getWorkbenchStatsUseCase;
  }

  async getAll(req, res) {
    const { tags, isFeatured, page, limit } = req.query;
    const workbenchId = req.user.workbenchId;

    // Headless API only returns Published articles
    const articles = await this.#getArticlesUseCase.execute(
      {
        status: "PUBLISHED",
        tags,
        isFeatured: isFeatured !== undefined ? isFeatured === "true" : undefined,
      },
      workbenchId,
      { page: Number(page) || 1, limit: Number(limit) || 10 },
    );

    return successResponse(res, articles, "Articles retrieved successfully", 200);
  }

  async getBySlug(req, res) {
    const { slug } = req.params;
    const workbenchId = req.user.workbenchId;

    const article = await this.#getArticleUseCase.execute({ slug, isAdmin: false });

    // Track Article View
    await this.#trackEventUseCase.execute({
      apiKeyId: req.user.apiKeyId,
      workbenchId,
      articleId: article._id,
      type: "ARTICLE_VIEW",
      metadata: { slug, source: "headless-api" }
    });

    return successResponse(res, article, "Article retrieved successfully", 200);
  }

  async getCategories(req, res) {
    const workbenchId = req.user.workbenchId;
    const categories = await this.#getCategoriesUseCase.execute(workbenchId);

    return successResponse(res, categories, "Categories retrieved successfully", 200);
  }

  async trackEvent(req, res) {
    const { type, articleId, metadata } = req.body;
    const workbenchId = req.user.workbenchId;

    await this.#trackEventUseCase.execute({
      apiKeyId: req.user.apiKeyId,
      workbenchId,
      articleId,
      type,
      metadata
    });

    return successResponse(res, null, "Event tracked successfully", 200);
  }

  async getStats(req, res) {
    const workbenchId = req.user.workbenchId;
    const stats = await this.#getWorkbenchStatsUseCase.execute(workbenchId);
    
    return successResponse(res, stats, "Stats retrieved successfully", 200);
  }
}
