import PlanController from "../../../../infrastructure/http/controllers/plan.controller.js";

export const registerPlanControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "planController",
    new PlanController({
      getAllPlansUseCase: resolveDependency("getAllPlansUseCase"),
    }),
  );
};
