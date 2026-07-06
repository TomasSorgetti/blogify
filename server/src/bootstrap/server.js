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

    this.#app.use(
      compression({
        level: 6,
        threshold: 1024,
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

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();

    const allowedOrigins = this.#config.env.ALLOWED_ORIGINS
      ? this.#config.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : [];

    this.#app.use(
      "/api",
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`Origin '${origin}' not allowed by CORS`));
          }
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
      dependencies.planLimitsMiddleware.checkApiRequestLimit(),
      dependencies.planLimitsMiddleware.trackApiRequest(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({
          ...this.#container.resolveMany([
            "articleRepository",
            "getArticlesUseCase",
            "getArticleUseCase",
          ]),
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

  getContainer() {
    return this.#container;
  }
}

export default Server;
