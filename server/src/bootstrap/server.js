import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { fileURLToPath } from "url";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "../infrastructure/graphql/typeDefs.js";
import { resolvers } from "../infrastructure/graphql/resolvers.js";
import errorMiddleware from "../infrastructure/http/middlewares/error.middleware.js";
import { createContainer } from "./container/index.js";
import {
  MainRouter,
  FetchRouter,
} from "../infrastructure/http/routes/index.js";

class Server {
  #app;
  #config;
  #container;
  #routes = {};

  constructor(config) {
    this.#config = config;
    this.#app = express();
    this.#container = createContainer(config);
  }

  async init() {
    this.#app.use(express.json({ limit: "10mb" }));
    this.#app.use(express.urlencoded({ limit: "10mb", extended: true }));

    // Compression middleware
    this.#app.use(
      compression({
        level: 6,
        threshold: 1024, // Only compress responses > 1KB
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) return false;
          return compression.filter(req, res);
        },
      }),
    );

    if (process.env.NODE_ENV === "development") {
      this.#app.use(morgan("dev"));
    } else {
      this.#app.use(
        morgan("combined", {
          skip: (req, res) => {
            const isError = res.statusCode >= 400;
            const isSlowRequest = Date.now() - req._startTime > 1000;
            return !isError && !isSlowRequest;
          },
        }),
      );
    }

    // Request timeout handling
    this.#app.use((req, res, next) => {
      req.setTimeout(30000);
      res.setTimeout(30000);
      next();
    });

    this.#app.use(cookieParser());

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    this.#app.use(express.static(path.join(__dirname, "../../public")));
    this.#app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "../../uploads")),
    );

    this.#app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../../public", "index.html"));
    });

    const dependencies = this.#container.getDependencies();
    this.#routes = {
      main: new MainRouter(dependencies),
      fetch: new FetchRouter(dependencies),
    };

    // Setup Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();

    this.#app.use(
      "/api",
      cors({
        origin: function (origin, callback) {
          callback(null, origin || true);
        },
        credentials: true,
      }),
      this.#routes.main.getRouter(),
    );

    this.#app.use(
      "/fetch",
      cors(),
      dependencies.apiKeyMiddleware.handle.bind(dependencies.apiKeyMiddleware),
      this.#routes.fetch.getRouter(),
    );

    this.#app.use(
      "/graphql",
      cors(),
      dependencies.apiKeyMiddleware.handle.bind(dependencies.apiKeyMiddleware),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({
          ...dependencies,
          user: req.user,
        }),
      }),
    );

    this.#app.use(errorMiddleware);
    return this;
  }

  getApp() {
    return this.#app;
  }

  start() {
    const port = this.#config.env.PORT;
    const api_url = this.#config.env.API_URL;

    this.#app.listen(port, () => {
      console.log("- - - - - - - - - - - - - - - - -");
      console.log(`Server running on ${api_url}`);
      console.log("- - - - - - - - - - - - - - - - -");
    });

    // Start Redis Stream Response Listener
    const { responseListener } = this.#config.queues;
    const { articleRepository } = this.#container.getDependencies();

    // Register handlers for events coming from the Worker
    responseListener.on("AI_SUMMARY_COMPLETED", async (payload) => {
      console.log(
        `[Server] AI Summary completed for article ${payload.article_id}`,
      );
      try {
        await articleRepository.updateById(payload.article_id, {
          summary: payload.summary,
        });
        console.log(`[Server] Article ${payload.article_id} summary updated.`);
      } catch (err) {
        console.error(
          `[Server] Failed to update article ${payload.article_id}:`,
          err,
        );
      }
    });

    responseListener.start().catch((err) => {
      console.error("[Server] Failed to start ResponseListener:", err);
    });
  }
}

export default Server;
