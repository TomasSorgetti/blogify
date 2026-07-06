import ArticleRepository from "../../../../infrastructure/modules/article/article.repository.js";

export const registerArticleRepository = (container, models) => {
  container.register("articleRepository", new ArticleRepository(models.Article));
};
