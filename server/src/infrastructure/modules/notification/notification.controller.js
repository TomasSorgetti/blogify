import successResponse from "../../http/utils/success-response.js";

export default class NotificationController {
  #getMyNotificationsUseCase;
  #deleteOneNotificationUseCase;
  #markAllAsReadUseCase;

  constructor({
    getMyNotificationsUseCase,
    deleteOneNotificationUseCase,
    markAllAsReadUseCase,
  }) {
    this.#getMyNotificationsUseCase = getMyNotificationsUseCase;
    this.#deleteOneNotificationUseCase = deleteOneNotificationUseCase;
    this.#markAllAsReadUseCase = markAllAsReadUseCase;
  }

  async getAll(req, res) {
    const userId = req.user._id;

    const data = await this.#getMyNotificationsUseCase.execute({ userId });

    return successResponse(
      res,
      data,
      "Notifications retrieved successfully",
      200,
    );
  }

  async deleteOne(req, res) {
    const userId = req.user._id;
    const { id } = req.params;

    const data = await this.#deleteOneNotificationUseCase.execute({
      userId,
      id,
    });

    return successResponse(
      res,
      data,
      "Notification deleted successfully",
      200,
    );
  }

  async markAllAsRead(req, res) {
    const userId = req.user._id;

    const data = await this.#markAllAsReadUseCase.execute({ userId });

    return successResponse(
      res,
      data,
      "Notification updated successfully",
      200,
    );
  }
}
