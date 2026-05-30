import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GetWorkbenchStatsUseCase extends UseCaseContract {
  #analyticsRepository;
  #articleRepository;

  constructor({ analyticsRepository, articleRepository }) {
    super();
    this.#analyticsRepository = analyticsRepository;
    this.#articleRepository = articleRepository;
  }

  async execute(workbenchId) {
    const articlesCount = await this.#articleRepository.countByWorkbench(workbenchId);
    const stats = await this.#analyticsRepository.getStatsByWorkbench(workbenchId);
    
    const views = stats.find(s => s._id === "ARTICLE_VIEW")?.count || 0;
    const requests = stats.find(s => s._id === "API_REQUEST")?.count || 0;
    
    const topArticles = await this.#analyticsRepository.getTopArticles(workbenchId);
    const viewsHistory = await this.#analyticsRepository.getViewsTimeSeries(workbenchId);

    return {
      totalViews: views.toLocaleString(),
      apiRequests: requests.toLocaleString(),
      articles: articlesCount.toString(),
      engagementRate: views > 0 ? "4.2%" : "0%",
      topArticles,
      history: viewsHistory.map(h => ({ name: h._id, views: h.views }))
    };
  }
}
