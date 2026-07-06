import ActivityLogRepository from "../../../../infrastructure/modules/activitylog/activitylog.repository.js";

export const registerActivityLogRepository = (container, models) => {
  container.register("activityLogRepository", new ActivityLogRepository(models.ActivityLog));
};
