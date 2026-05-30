import successResponse from "../utils/success-response.js";

export default class ArticleController {
  #getArticlesUseCase;
  #getArticleUseCase;
  #getGlobalArticlesUseCase;
  #searchArticlesUseCase;
  #createArticleUseCase;
  #updateArticleUseCase;
  #deleteArticleUseCase;
  #generateAiArticleUseCase;
  #moveKanbanCardUseCase;

  constructor({
    getArticlesUseCase,
    getArticleUseCase,
    getGlobalArticlesUseCase,
    searchArticlesUseCase,
    createArticleUseCase,
    updateArticleUseCase,
    deleteArticleUseCase,
    generateAiArticleUseCase,
    moveKanbanCardUseCase,
  }) {
    this.#getArticlesUseCase = getArticlesUseCase;
    this.#getArticleUseCase = getArticleUseCase;
    this.#getGlobalArticlesUseCase = getGlobalArticlesUseCase;
    this.#searchArticlesUseCase = searchArticlesUseCase;
    this.#createArticleUseCase = createArticleUseCase;
    this.#updateArticleUseCase = updateArticleUseCase;
    this.#deleteArticleUseCase = deleteArticleUseCase;
    this.#generateAiArticleUseCase = generateAiArticleUseCase;
    this.#moveKanbanCardUseCase = moveKanbanCardUseCase;
  }

  async getGlobalArticles(req, res) {
    const { tags, isFeatured, page, limit } = req.query;

    const articles = await this.#getGlobalArticlesUseCase.execute(
      {
        tags,
        isFeatured:
          isFeatured !== undefined ? isFeatured === "true" : undefined,
      },
      { page: Number(page) || 1, limit: Number(limit) || 10 },
    );

    return successResponse(
      res,
      articles,
      "Articles retrieved successfully",
      200,
    );
  }

  async search(req, res) {
    const { search, status, tags, isGlobal, workbenchId, page, limit } =
      req.query;

    const articles = await this.#searchArticlesUseCase.execute(
      search,
      {
        status,
        tags,
        isGlobal: isGlobal !== undefined ? isGlobal === "true" : undefined,
        workbench: workbenchId,
      },
      { page: Number(page) || 1, limit: Number(limit) || 10 },
    );

    return successResponse(
      res,
      articles,
      "Articles search results retrieved",
      200,
    );
  }

  async getAll(req, res) {
    const { status, tags, isFeatured, page, limit } = req.query;
    let workbenchId = req.query.workbenchId;

    // Enforce workbench if authenticated via API Key
    if (req.user?.viaApiKey && req.user.workbenchId) {
      workbenchId = req.user.workbenchId;
    }

    const articles = await this.#getArticlesUseCase.execute(
      {
        status,
        tags,
        isFeatured: isFeatured !== undefined ? isFeatured === "true" : undefined,
      },
      workbenchId,
      { page: Number(page) || 1, limit: Number(limit) || 10 },
    );

    return successResponse(
      res,
      articles,
      "Articles retrieved successfully",
      200,
    );
  }

  async getPostBySlug(req, res) {
    const { slug } = req.params;

    const isAdmin = req.user?.role === "admin";

    const data = await this.#getArticleUseCase.execute({ slug, isAdmin });
    return successResponse(res, data, "Article retrieved successfully", 200);
  }

  async createPost(req, res) {
    const author = req?.user?._id;
    const {
      title,
      slug,
      content,
      summary,
      tags,
      status,
      image,
      isFeatured,
      categories,
      newCategories,
      workbench,
      isGlobal,
    } = req.body;

    const article = await this.#createArticleUseCase.execute({
      title,
      slug,
      content,
      summary,
      author,
      tags,
      status,
      image,
      file: req.file,
      isFeatured,
      categories,
      newCategories,
      workbench,
      isGlobal,
    });

    return successResponse(res, article, "Article created successfully", 201);
  }

  async generateAiArticle(req, res) {
    const { prompt, tone } = req.body;

    const article = await this.#generateAiArticleUseCase.execute({
      prompt,
      tone,
    });

    return successResponse(res, article, "Article generated successfully", 201);
  }

  async updatePost(req, res) {
    const { slug } = req.params;
    const {
      title,
      content,
      summary,
      author,
      tags,
      status,
      image,
      isFeatured,
      categories,
      newCategories,
    } = req.body;

    await this.#updateArticleUseCase.execute(req.user._id, {
      title,
      slug,
      content,
      summary,
      author,
      tags,
      status,
      image,
      isFeatured,
      categories,
      newCategories,
    }, req.file);

    return successResponse(res, null, "Article updated successfully", 200);
  }

  async deletePost(req, res) {
    const { slug } = req.params;

    const data = await this.#deleteArticleUseCase.execute(req.user._id, slug);
    return successResponse(res, data, "Article deleted successfully", 200);
  }

  async moveKanbanCard(req, res) {
    const { slug } = req.params;
    const { kanbanColumn } = req.body;

    const article = await this.#moveKanbanCardUseCase.execute(req.user._id, {
      slug,
      kanbanColumn,
    });

    return successResponse(res, article, "Article moved successfully", 200);
  }
}
