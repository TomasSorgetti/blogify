import envConfig from "./env.config.js";
import { connectDB } from "../database/database.js";
import { connectEmail } from "../services/email/client.js";
import connectStripe from "../services/stripe/client.js";
import { connectQueues } from "../services/queue/client.js";
import { connectRedis } from "../services/cache/client.js";
import { GoogleGenAI } from "@google/genai";

export const initializeConfig = async () => {
  const db = await connectDB(envConfig.MONGO_URL);
  const email = await connectEmail(envConfig.RESEND_API_KEY);
  const queues = connectQueues(envConfig.REDIS_URL);
  const redisCacheClient = await connectRedis(envConfig.REDIS_URL);
  const stripe = connectStripe(envConfig.STRIPE_SECRET_KEY);

  const aiClient = new GoogleGenAI(envConfig.GOOGLE_GENERATIVE_AI_API_KEY);

  return {
    db,
    email,
    queues,
    redisCacheClient,
    stripe,
    aiClient,
    env: envConfig,
  };
};
