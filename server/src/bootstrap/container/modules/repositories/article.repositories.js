import ArticleRepository from "../../../../infrastructure/database/repositories/article.repository.js";

export const registerArticleRepository = (container, models) => {
  container.register("articleRepository", new ArticleRepository(models.Article));
};
