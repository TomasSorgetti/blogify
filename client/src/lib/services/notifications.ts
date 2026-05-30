import { privateApi } from "./api";
import { handleApiRequest } from "./apiHelpers";

export async function GetMyNotifications() {
  return handleApiRequest(() => privateApi.get(`/notifications/me`));
}

export async function DeleteNotification(id: string) {
  return handleApiRequest(() => privateApi.delete(`/notifications/me/${id}`));
}

export async function MarkAllNotificationsAsRead() {
  return handleApiRequest(() => privateApi.patch(`/notifications/me`));
}
