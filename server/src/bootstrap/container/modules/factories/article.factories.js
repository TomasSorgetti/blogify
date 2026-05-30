import ArticleFactory from "../../../../domain/factories/article.factory.js";

export const registerArticleFactory = (container) => {
  container.register("articleFactory", new ArticleFactory());
};
