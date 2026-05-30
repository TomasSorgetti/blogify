import ArticleController from "../../../../infrastructure/http/controllers/article.controller.js";

export const registerArticleControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "articleController",
    new ArticleController({
      getArticlesUseCase: resolveDependency("getArticlesUseCase"),
      getArticleUseCase: resolveDependency("getArticleUseCase"),
      getGlobalArticlesUseCase: resolveDependency("getGlobalArticlesUseCase"),
      searchArticlesUseCase: resolveDependency("searchArticlesUseCase"),
      createArticleUseCase: resolveDependency("createArticleUseCase"),
      updateArticleUseCase: resolveDependency("updateArticleUseCase"),
      deleteArticleUseCase: resolveDependency("deleteArticleUseCase"),
      generateAiArticleUseCase: resolveDependency("generateAiArticleUseCase"),
    }),
  );
};
