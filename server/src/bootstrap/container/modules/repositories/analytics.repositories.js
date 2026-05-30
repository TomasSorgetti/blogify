import AnalyticsRepository from "../../../../infrastructure/database/repositories/analytics.repository.js";

export const registerAnalyticsRepository = (container) => {
  container.register("analyticsRepository", new AnalyticsRepository());
};
