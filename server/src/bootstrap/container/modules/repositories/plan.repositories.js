import PlanRepository from "../../../../infrastructure/modules/plan/plan.repository.js";

export const registerPlanRepository = (container, models) => {
  container.register("planRepository", new PlanRepository(models.Plan));
};
