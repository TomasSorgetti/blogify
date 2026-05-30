import { createClient } from "redis";

export class ResponseListener {
  #client;
  #handlers = new Map();
  #listening = false;

  constructor(redisUrl) {
    this.#client = createClient({ url: redisUrl });
    this.#client.on("error", (err) =>
      console.error("[ResponseListener] Redis Error", err),
    );
  }

  on(eventType, handler) {
    this.#handlers.set(eventType, handler);
  }

  async start() {
    await this.#client.connect();
    console.log("[ResponseListener] Started listening to events:inbox:node");

    try {
      await this.#client.xGroupCreate("events:inbox:node", "node:group", "$", {
        MKSTREAM: true,
      });
    } catch (e) {}

    this.#listening = true;
    this.#processEvents();
  }

  #processEvents() {
    if (!this.#listening) return;

    this.#client
      .xReadGroup(
        "node:group",
        "node:1",
        { key: "events:inbox:node", id: ">" },
        { COUNT: 1, BLOCK: 5000 },
      )
      .then(async (response) => {
        if (response) {
          for (const stream of response) {
            for (const record of stream.messages) {
              const eventRaw = record.data.event;
              const event = JSON.parse(eventRaw);

              console.log(`[ResponseListener] Received ${event.eventType}`);

              const handler = this.#handlers.get(event.eventType);
              if (handler) {
                try {
                  await handler(event.payload);
                  await this.#client.xAck(
                    "events:inbox:node",
                    "node:group",
                    record.id,
                  );
                } catch (err) {
                  console.error(
                    `[ResponseListener] Error in handler for ${event.eventType}:`,
                    err,
                  );
                }
              } else {
                console.warn(
                  `[ResponseListener] No handler for event type: ${event.eventType}`,
                );
                await this.#client.xAck(
                  "events:inbox:node",
                  "node:group",
                  record.id,
                );
              }
            }
          }
        }

        if (this.#listening) {
          setImmediate(() => this.#processEvents());
        }
      })
      .catch((err) => {
        console.error("[ResponseListener] Error reading from stream:", err);
        if (this.#listening) {
          setTimeout(() => this.#processEvents(), 1000);
        }
      });
  }

  stop() {
    console.log("[ResponseListener] Stopping listener...");
    this.#listening = false;
    this.#client.disconnect().catch((err) => {
      console.error("[ResponseListener] Error disconnecting:", err);
    });
  }
}
