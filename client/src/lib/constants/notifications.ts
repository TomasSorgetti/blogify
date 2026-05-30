export const NOTIFICATION_CATEGORIES = [
  {
    id: "articles",
    label: "Article updates",
    desc: "Get notified when articles are published or updated",
  },
  {
    id: "comments",
    label: "Comments",
    desc: "Receive notifications for new comments",
  },
  {
    id: "api_alerts",
    label: "API alerts",
    desc: "Get alerts for API rate limits and errors",
  },
  {
    id: "billing",
    label: "Billing",
    desc: "Receive billing receipts and payment reminders",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    desc: "Weekly digest of tips and product updates",
  },
] as const;

export type NotificationId = (typeof NOTIFICATION_CATEGORIES)[number]["id"];
