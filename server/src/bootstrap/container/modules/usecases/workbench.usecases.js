import getAllWorkbenchesUseCase from "../../../../application/workbench/getAll.usecase.js";
import createWorkbenchUseCase from "../../../../application/workbench/create.usecase.js";
import UpdateWorkbenchUseCase from "../../../../application/workbench/update.usecase.js";
import DeleteWorkbenchUseCase from "../../../../application/workbench/delete.usecase.js";
import AddMemberUseCase from "../../../../application/workbench/addMember.usecase.js";
import RemoveMemberUseCase from "../../../../application/workbench/removeMember.usecase.js";
import UpdateMemberRoleUseCase from "../../../../application/workbench/updateMemberRole.usecase.js";
import GetWorkbenchActivityUseCase from "../../../../application/workbench/getActivity.usecase.js";
import CacheQueryDecorator from "../../../../application/common/decorators/CacheQueryDecorator.js";
import CacheInvalidationDecorator from "../../../../application/common/decorators/CacheInvalidationDecorator.js";

export const registerWorkbenchUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);
  const redisService = resolveDependency("redisService");

  const getAllUseCase = new getAllWorkbenchesUseCase({
    workbenchRepository: resolveDependency("workbenchRepository"),
    workbenchFactory: resolveDependency("workbenchFactory"),
    articleRepository: resolveDependency("articleRepository"),
  });
  container.register(
    "getAllWorkbenchesUseCase",
    new CacheQueryDecorator({
      useCase: getAllUseCase,
      cacheService: redisService,
      keyGenerator: (userId) => `workbenches:user:${userId}`,
      tags: (userId) => [`workbenches:user:${userId}`],
    }),
  );

  const createUseCase = new createWorkbenchUseCase({
    workbenchRepository: resolveDependency("workbenchRepository"),
    workbenchFactory: resolveDependency("workbenchFactory"),
  });
  container.register(
    "createWorkbenchUseCase",
    new CacheInvalidationDecorator({
      useCase: createUseCase,
      cacheService: redisService,
      tagsGenerator: ({ userId }) => [`workbenches:user:${userId}`],
    }),
  );

  const updateUseCase = new UpdateWorkbenchUseCase({
    workbenchRepository: resolveDependency("workbenchRepository"),
  });
  container.register(
    "updateWorkbenchUseCase",
    new CacheInvalidationDecorator({
      useCase: updateUseCase,
      cacheService: redisService,
      tagsGenerator: ({ userId }) => [`workbenches:user:${userId}`],
    }),
  );

  const deleteUseCase = new DeleteWorkbenchUseCase({
    workbenchRepository: resolveDependency("workbenchRepository"),
    articleRepository: resolveDependency("articleRepository"),
  });
  container.register(
    "deleteWorkbenchUseCase",
    new CacheInvalidationDecorator({
      useCase: deleteUseCase,
      cacheService: redisService,
      tagsGenerator: ({ userId }) => [`workbenches:user:${userId}`],
    }),
  );

  const addMemberUseCase = new AddMemberUseCase({
    workbenchRepository: resolveDependency("workbenchRepository"),
    userRepository: resolveDependency("userRepository"),
  });
  container.register(
    "addMemberUseCase",
    new CacheInvalidationDecorator({
      useCase: addMemberUseCase,
      cacheService: redisService,
      tagsGenerator: ({ userId, targetUserId }) => [
        `workbenches:user:${userId}`,
        `workbenches:user:${targetUserId}`,
      ],
    }),
  );

  container.register(
    "removeMemberUseCase",
    new RemoveMemberUseCase({
      workbenchRepository: resolveDependency("workbenchRepository"),
    }),
  );

  container.register(
    "updateMemberRoleUseCase",
    new UpdateMemberRoleUseCase({
      workbenchRepository: resolveDependency("workbenchRepository"),
    }),
  );

  const getActivityUseCase = new GetWorkbenchActivityUseCase({
    activityLogRepository: resolveDependency("activityLogRepository"),
    workbenchRepository: resolveDependency("workbenchRepository"),
  });
  container.register(
    "getWorkbenchActivityUseCase",
    new CacheQueryDecorator({
      useCase: getActivityUseCase,
      cacheService: redisService,
      keyGenerator: (userId, workbenchId) => `workbench:activity:${workbenchId}`,
      tags: (userId, workbenchId) => [`workbench:activity:${workbenchId}`],
      ttl: 60,
    }),
  );
};
