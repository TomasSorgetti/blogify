import mongoose from "mongoose";
import User from "../modules/user/user.schema.js";
import Session from "../modules/session/session.schema.js";
import Subscription from "../modules/subscription/subscription.schema.js";
import Article from "../modules/article/article.schema.js";
import Category from "../modules/category/category.schema.js";
import Plan from "../modules/plan/plan.schema.js";
import Workbench from "../modules/workbench/workbench.schema.js";
import Notification from "../modules/notification/notification.schema.js";
import ApiKey from "../modules/apikey/apikey.schema.js";
import ActivityLog from "../modules/activitylog/activitylog.schema.js";
import Analytics from "../modules/analytics/analytics.schema.js";

// seeds
import seedPlans from "./seeds/plan.seed.js";
import seedCategories from "./seeds/category.seed.js";
import seedArticles from "./seeds/article.seed.js";

export const connectDB = async (dbUrl) => {
  if (!dbUrl) {
    throw new Error("No db url provided");
  }
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB ya conectado");
    return;
  }
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    console.log("MongoDB connected");

    await seedPlans(Plan);
    await seedCategories(Category);
    await seedArticles(Article);
    console.log("Seeds created");

    return {
      mongoose,
      models: {
        User,
        Session,
        Subscription,
        Plan,
        Workbench,
        Article,
        Category,
        Notification,
        ApiKey,
        ActivityLog,
        Analytics,
      },
    };
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};
