use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ArticleViewedPayload {
    pub article_id: String,
    pub user_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ActivityLoggedPayload {
    pub user_id: String,
    pub action: String,
    pub details: serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct NotificationTriggeredPayload {
    pub user_id: String,
    pub message: String,
    pub notification_type: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct EmailRequestedPayload {
    pub to: String,
    pub subject: String,
    pub template: String,
    pub context: serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AiSummaryRequestedPayload {
    pub article_id: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AiSummaryCompletedPayload {
    pub article_id: String,
    pub summary: String,
}
