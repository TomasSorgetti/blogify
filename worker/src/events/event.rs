use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct EventEnvelope<T> {
    pub event_id: Uuid,
    pub event_type: String,
    pub schema_version: u32,
    pub occurred_at: i64, // Unix timestamp
    pub payload: T,
}