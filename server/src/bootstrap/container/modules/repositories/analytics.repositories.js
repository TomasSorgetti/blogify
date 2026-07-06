import AnalyticsRepository from "../../../../infrastructure/modules/analytics/analytics.repository.js";

export const registerAnalyticsRepository = (container) => {
  container.register("analyticsRepository", new AnalyticsRepository());
};
