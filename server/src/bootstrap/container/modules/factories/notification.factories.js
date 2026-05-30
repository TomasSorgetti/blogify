import NotificationFactory from "../../../../domain/factories/notification.factory.js";

export const registerNotificationFactory = (container) => {
  container.register("notificationFactory", new NotificationFactory());
};
