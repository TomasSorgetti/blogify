import ActivityLogRepository from "../../../../infrastructure/database/repositories/activitylog.repository.js";

export const registerActivityLogRepository = (container, models) => {
  container.register("activityLogRepository", new ActivityLogRepository(models.ActivityLog));
};
