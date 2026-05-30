import PlanRepository from "../../../../infrastructure/database/repositories/plan.repository.js";

export const registerPlanRepository = (container, models) => {
  container.register("planRepository", new PlanRepository(models.Plan));
};
