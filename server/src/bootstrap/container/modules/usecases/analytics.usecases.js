import TrackEventUseCase from "../../../../application/analytics/trackEvent.usecase.js";
import GetWorkbenchStatsUseCase from "../../../../application/analytics/getWorkbenchStats.usecase.js";

export const registerAnalyticsUseCases = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "trackEventUseCase",
    new TrackEventUseCase({
      analyticsRepository: resolveDependency("analyticsRepository"),
    }),
  );
  container.register(
    "getWorkbenchStatsUseCase",
    new GetWorkbenchStatsUseCase({
      analyticsRepository: resolveDependency("analyticsRepository"),
      articleRepository: resolveDependency("articleRepository"),
    }),
  );
};
