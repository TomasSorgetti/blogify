import WorkbenchController from "../../../../infrastructure/http/controllers/workbench.controller.js";

export const registerWorkbenchControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "workbenchController",
    new WorkbenchController({
      getAllWorkbenchesUseCase: resolveDependency("getAllWorkbenchesUseCase"),
      createWorkbenchUseCase: resolveDependency("createWorkbenchUseCase"),
      updateWorkbenchUseCase: resolveDependency("updateWorkbenchUseCase"),
      deleteWorkbenchUseCase: resolveDependency("deleteWorkbenchUseCase"),
      addMemberUseCase: resolveDependency("addMemberUseCase"),
      removeMemberUseCase: resolveDependency("removeMemberUseCase"),
      updateMemberRoleUseCase: resolveDependency("updateMemberRoleUseCase"),
    }),
  );
};
