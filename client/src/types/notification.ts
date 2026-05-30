type MessageType = "system" | "subscription" | "activity";

export interface INotification {
  _id: string;
  userId: string;
  type: string;
  message: MessageType;
  read: boolean;
  link?: string | null;
  createdAt: string;
}
