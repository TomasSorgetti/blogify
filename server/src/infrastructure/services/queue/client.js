import QueueService from "./service.js";
import { EventBus } from "./event-bus.js";
import { ResponseListener } from "./response-listener.js";

export const connectQueues = (redisUrl) => {
  const emailQueueService = new QueueService("emails", redisUrl);
  const eventBus = new EventBus(redisUrl);
  const responseListener = new ResponseListener(redisUrl);

  return {
    emailQueueService,
    eventBus,
    responseListener,
  };
};
