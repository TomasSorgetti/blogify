import GetArticlesUseCase from "../../../../application/article/getArticles.usecase.js";
import GetGlobalArticlesUseCase from "../../../../application/article/getGlobalArticles.usecase.js";
import SearchArticlesUseCase from "../../../../application/article/searchArticles.usecase.js";
import CreateArticleUseCase from "../../../../application/article/createArticle.usecase.js";
import UpdateArticleUseCase from "../../../../application/article/updateArticle.usecase.js";
import DeleteArticleUseCase from "../../../../application/article/deleteArticle.usecase.js";
import GenerateAiArticleUseCase from "../../../../application/article/generateAi.usecase.js";
import GetArticleUseCase from "../../../../application/article/getArticle.usecase.js";
import MoveKanbanCardUseCase from "../../../../application/article/moveKanbanCard.usecase.js";
import CacheQueryDecorator from "../../../../application/common/decorators/CacheQueryDecorator.js";
import CacheInvalidationDecorator from "../../../../application/common/decorators/CacheInvalidationDecorator.js";

export const registerArticleUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);
  const redisService = resolveDependency("redisService");

  // --- READS ---

  const getArticlesUseCase = new GetArticlesUseCase({
    articleRepository: resolveDependency("articleRepository"),
  });
  container.register(
    "getArticlesUseCase",
    new CacheQueryDecorator({
      useCase: getArticlesUseCase,
      cacheService: redisService,
      keyGenerator: (filters, workbenchId, pagination) =>
        `articles:workbench:${workbenchId}:page:${pagination?.page || 1}:limit:${pagination?.limit || 10}:status:${filters?.status || "all"}`,
      tags: (filters, workbenchId) => [
        `articles:workbench:${workbenchId}`,
        "articles:global",
      ],
      ttl: 300, // 5 minutes for workbench articles (may change frequently)
    }),
  );

  const getArticleUseCase = new GetArticleUseCase({
    articleRepository: resolveDependency("articleRepository"),
    eventBus: resolveDependency("eventBus"),
  });
  container.register(
    "getArticleUseCase",
    new CacheQueryDecorator({
      useCase: getArticleUseCase,
      cacheService: redisService,
      keyGenerator: ({ slug }) => `article:slug:${slug}`,
      tags: ({ slug }) => [`article:slug:${slug}`],
      ttl: 600, // 10 minutes for individual articles
    }),
  );

  const getGlobalArticlesUseCase = new GetGlobalArticlesUseCase({
    articleRepository: resolveDependency("articleRepository"),
  });
  container.register(
    "getGlobalArticlesUseCase",
    new CacheQueryDecorator({
      useCase: getGlobalArticlesUseCase,
      cacheService: redisService,
      keyGenerator: (filters, pagination) =>
        `articles:global:page:${pagination?.page || 1}:limit:${pagination?.limit || 10}`,
      tags: ["articles:global"],
      ttl: 900, // 15 minutes for global articles (more stable, fewer changes)
    }),
  );

  container.register(
    "searchArticlesUseCase",
    new SearchArticlesUseCase({
      articleRepository: resolveDependency("articleRepository"),
    }),
  );

  // --- WRITES ---

  const createArticleUseCase = new CreateArticleUseCase({
    articleRepository: resolveDependency("articleRepository"),
    workbenchRepository: resolveDependency("workbenchRepository"),
    categoryRepository: resolveDependency("categoryRepository"),
    notificationRepository: resolveDependency("notificationRepository"),
    socketService: resolveDependency("socketService"),
    storageService: resolveDependency("storageService"),
    articleFactory: resolveDependency("articleFactory"),
    notificationFactory: resolveDependency("notificationFactory"),
  });
  container.register(
    "createArticleUseCase",
    new CacheInvalidationDecorator({
      useCase: createArticleUseCase,
      cacheService: redisService,
      tagsGenerator: ({ workbench }) => [
        `articles:workbench:${workbench}`,
        "articles:global",
      ],
    }),
  );

  container.register(
    "generateAiArticleUseCase",
    new GenerateAiArticleUseCase({
      aiClient: resolveDependency("aiClient"),
      articleFactory: resolveDependency("articleFactory"),
    }),
  );

  const updateArticleUseCase = new UpdateArticleUseCase({
    articleRepository: resolveDependency("articleRepository"),
    workbenchRepository: resolveDependency("workbenchRepository"),
    notificationRepository: resolveDependency("notificationRepository"),
    socketService: resolveDependency("socketService"),
    storageService: resolveDependency("storageService"),
    articleFactory: resolveDependency("articleFactory"),
    notificationFactory: resolveDependency("notificationFactory"),
  });
  container.register(
    "updateArticleUseCase",
    new CacheInvalidationDecorator({
      useCase: updateArticleUseCase,
      cacheService: redisService,
      tagsGenerator: (userId, { slug, workbench }) => [
        `article:slug:${slug}`,
        `articles:workbench:${workbench}`,
        "articles:global",
      ],
    }),
  );

  const deleteArticleUseCase = new DeleteArticleUseCase({
    articleRepository: resolveDependency("articleRepository"),
    workbenchRepository: resolveDependency("workbenchRepository"),
    notificationRepository: resolveDependency("notificationRepository"),
    socketService: resolveDependency("socketService"),
    notificationFactory: resolveDependency("notificationFactory"),
  });
  container.register(
    "deleteArticleUseCase",
    new CacheInvalidationDecorator({
      useCase: deleteArticleUseCase,
      cacheService: redisService,
      tagsGenerator: (userId, slug) => [
        `article:slug:${slug}`,
        "articles:global",
      ],
    }),
  );

  const moveKanbanCardUseCase = new MoveKanbanCardUseCase({
    articleRepository: resolveDependency("articleRepository"),
    workbenchRepository: resolveDependency("workbenchRepository"),
    activityLogRepository: resolveDependency("activityLogRepository"),
  });
  container.register(
    "moveKanbanCardUseCase",
    new CacheInvalidationDecorator({
      useCase: moveKanbanCardUseCase,
      cacheService: redisService,
      tagsGenerator: (userId, { slug }) => [`article:slug:${slug}`],
    }),
  );
};
