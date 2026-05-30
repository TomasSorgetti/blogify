import FetchController from "../../../../infrastructure/http/controllers/fetch.controller.js";

export const registerFetchControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "fetchController",
    new FetchController({
      getArticlesUseCase: resolveDependency("getArticlesUseCase"),
      getArticleUseCase: resolveDependency("getArticleUseCase"),
      getCategoriesUseCase: resolveDependency("getAllCategoriesUseCase"),
      trackEventUseCase: resolveDependency("trackEventUseCase"),
      getWorkbenchStatsUseCase: resolveDependency("getWorkbenchStatsUseCase"),
    }),
  );
};
