export class AnalyticsRepositoryContract {
  async track(data) {
    throw new Error(`${this.constructor.name}: method [track] must be implemented.`);
  }

  async getStatsByWorkbench(workbenchId, startDate, endDate) {
    throw new Error(`${this.constructor.name}: method [getStatsByWorkbench] must be implemented.`);
  }

  async getTopArticles(workbenchId, limit) {
    throw new Error(`${this.constructor.name}: method [getTopArticles] must be implemented.`);
  }

  async getViewsTimeSeries(workbenchId, days) {
    throw new Error(`${this.constructor.name}: method [getViewsTimeSeries] must be implemented.`);
  }
}
