import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetArticleUseCase extends UseCaseContract {
  #articleRepository;
  #eventBus;

  constructor({ articleRepository, eventBus }) {
    super();
    this.#articleRepository = articleRepository;
    this.#eventBus = eventBus;
  }

  async execute({ slug, isAdmin = false, userId = null }) {
    const article = await this.#articleRepository.findBySlug(slug);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    if (!isAdmin) {
      const updatedArticle = await this.#articleRepository.incrementViews(
        article._id || article.id,
      );

      await this.#eventBus.publish("events:analytics", "ARTICLE_VIEWED", {
        articleId: article._id || article.id,
        userId: userId,
      });

      return updatedArticle;
    }

    return article;
  }
}
