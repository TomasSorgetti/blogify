import http from "http";
import { initializeConfig } from "./src/infrastructure/config/index.js";
import Server from "./src/bootstrap/server.js";
import { connectSocket } from "./src/infrastructure/services/socket/client.js";
import AiSummaryCompletedHandler from "./src/application/article/handlers/aiSummaryCompleted.handler.js";

initializeConfig()
  .then(async (config) => {
    const server = new Server(config);
    await server.init();

    const httpServer = http.createServer(server.getApp());
    connectSocket(httpServer);

    httpServer.keepAliveTimeout = 65000;
    httpServer.headersTimeout = 66000;
    httpServer.requestTimeout = 30000;

    const port = config.env.PORT;
    httpServer.listen(port, () => {
      console.log("- - - - - - - - - - - - - - - - -");
      console.log(`Server running on ${config.env.API_URL}`);
      console.log("- - - - - - - - - - - - - - - - -");
    });

    const { responseListener } = config.queues;
    const aiSummaryHandler = new AiSummaryCompletedHandler({
      articleRepository: server.getContainer().resolve("articleRepository"),
    });
    responseListener.on("AI_SUMMARY_COMPLETED", (payload) =>
      aiSummaryHandler.handle(payload),
    );
    responseListener.start().catch((err) => {
      console.error("[ResponseListener] Failed to start:", err);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully...");
      httpServer.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("Failed to initialize config", error);
    process.exit(1);
  });

