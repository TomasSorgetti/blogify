import GetAllPlansUseCase from "../../../../application/plan/getAll.usecase.js";
import CacheQueryDecorator from "../../../../application/common/decorators/CacheQueryDecorator.js";

export const registerPlanUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);
  const redisService = resolveDependency("redisService");

  const getAllPlansUseCase = new GetAllPlansUseCase({
    planRepository: resolveDependency("planRepository"),
  });
  container.register(
    "getAllPlansUseCase",
    new CacheQueryDecorator({
      useCase: getAllPlansUseCase,
      cacheService: redisService,
      keyGenerator: () => "plans:all",
      tags: ["plans:all"],
      ttl: 86400, // 24 hours
    }),
  );
};
