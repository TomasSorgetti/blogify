import mongoose from "mongoose";
import Analytics from "../schemas/analytics.schema.js";
import { AnalyticsRepositoryContract } from "../../../domain/contracts/repositories/analytics.repository.contract.js";

export default class AnalyticsRepository extends AnalyticsRepositoryContract {
  constructor() {
    super();
  }
  async track(data) {
    const event = new Analytics(data);
    return await event.save();
  }

  async getStatsByWorkbench(workbenchId, startDate = new Date(0), endDate = new Date()) {
    return await Analytics.aggregate([
      { 
        $match: { 
          workbenchId: new mongoose.Types.ObjectId(workbenchId),
          createdAt: { $gte: startDate, $lte: endDate }
        } 
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);
  }

  async getTopArticles(workbenchId, limit = 5) {
    return await Analytics.aggregate([
      { $match: { workbenchId: new mongoose.Types.ObjectId(workbenchId), type: "ARTICLE_VIEW" } },
      {
        $group: {
          _id: "$articleId",
          views: { $sum: 1 }
        }
      },
      { $sort: { views: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "_id",
          as: "article"
        }
      },
      { $unwind: "$article" },
      {
        $project: {
          title: "$article.title",
          views: 1
        }
      }
    ]);
  }

  async getViewsTimeSeries(workbenchId, days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await Analytics.aggregate([
      { 
        $match: { 
          workbenchId: new mongoose.Types.ObjectId(workbenchId), 
          type: "ARTICLE_VIEW",
          createdAt: { $gte: startDate }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }
}
