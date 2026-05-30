import GetAllCategoriesUseCase from "../../../../application/category/getAll.usecase.js";
import GetCategoryUseCase from "../../../../application/category/getOne.usecase.js";
import CreateCategoryUseCase from "../../../../application/category/create.usecase.js";
import UpdateCategoryUseCase from "../../../../application/category/update.usecase.js";
import DeleteCategoryUseCase from "../../../../application/category/delete.usecase.js";
import CacheQueryDecorator from "../../../../application/common/decorators/CacheQueryDecorator.js";
import CacheInvalidationDecorator from "../../../../application/common/decorators/CacheInvalidationDecorator.js";

export const registerCategoryUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);
  const redisService = resolveDependency("redisService");

  const getAllCategoriesUseCase = new GetAllCategoriesUseCase({
    categoryRepository: resolveDependency("categoryRepository"),
  });
  container.register(
    "getAllCategoriesUseCase",
    new CacheQueryDecorator({
      useCase: getAllCategoriesUseCase,
      cacheService: redisService,
      keyGenerator: () => "categories:all",
      tags: ["categories:all"],
    }),
  );

  const getCategoryUseCase = new GetCategoryUseCase({
    categoryRepository: resolveDependency("categoryRepository"),
  });
  container.register(
    "getCategoryUseCase",
    new CacheQueryDecorator({
      useCase: getCategoryUseCase,
      cacheService: redisService,
      keyGenerator: (params) => `category:id:${params.id}`,
      tags: (params) => [`category:id:${params.id}`],
    }),
  );

  const createCategoryUseCase = new CreateCategoryUseCase({
    categoryRepository: resolveDependency("categoryRepository"),
    categoryFactory: resolveDependency("categoryFactory"),
  });
  container.register(
    "createCategoryUseCase",
    new CacheInvalidationDecorator({
      useCase: createCategoryUseCase,
      cacheService: redisService,
      tagsGenerator: () => ["categories:all"],
    }),
  );

  const updateCategoryUseCase = new UpdateCategoryUseCase({
    categoryRepository: resolveDependency("categoryRepository"),
  });
  container.register(
    "updateCategoryUseCase",
    new CacheInvalidationDecorator({
      useCase: updateCategoryUseCase,
      cacheService: redisService,
      tagsGenerator: (params) => ["categories:all", `category:id:${params.id}`],
    }),
  );

  const deleteCategoryUseCase = new DeleteCategoryUseCase({
    categoryRepository: resolveDependency("categoryRepository"),
  });
  container.register(
    "deleteCategoryUseCase",
    new CacheInvalidationDecorator({
      useCase: deleteCategoryUseCase,
      cacheService: redisService,
      tagsGenerator: (params) => ["categories:all", `category:id:${params.id}`],
    }),
  );
};
