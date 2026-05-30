pub mod analytics;
pub mod core;
pub mod notifications;
pub mod emails;
pub mod ai;

use crate::events::event::EventEnvelope;
use sqlx::PgPool;
use redis::aio::MultiplexedConnection;

pub async fn dispatch(
    event_raw: String, 
    pool: &PgPool,
    redis_con: &mut MultiplexedConnection
) -> Result<(), Box<dyn std::error::Error>> {
    let event_json: serde_json::Value = serde_json::from_str(&event_raw)?;
    let event_type = event_json["eventType"].as_str().unwrap_or("");

    match event_type {
        "ARTICLE_VIEWED" => {
            let event: EventEnvelope<crate::events::payloads::ArticleViewedPayload> = serde_json::from_str(&event_raw)?;
            analytics::handle(event, pool).await?;
        },
        "ACTIVITY_LOGGED" => {
            let event: EventEnvelope<crate::events::payloads::ActivityLoggedPayload> = serde_json::from_str(&event_raw)?;
            core::handle(event, pool).await?;
        },
        "NOTIFICATION_TRIGGERED" => {
            let event: EventEnvelope<crate::events::payloads::NotificationTriggeredPayload> = serde_json::from_str(&event_raw)?;
            notifications::handle(event, pool).await?;
        },
        "EMAIL_REQUESTED" => {
            let event: EventEnvelope<crate::events::payloads::EmailRequestedPayload> = serde_json::from_str(&event_raw)?;
            emails::handle(event).await?;
        },
        "AI_SUMMARY_REQUESTED" => {
            let event: EventEnvelope<crate::events::payloads::AiSummaryRequestedPayload> = serde_json::from_str(&event_raw)?;
            ai::handle(event, redis_con).await?;
        },
        _ => println!("Event type {} not handled", event_type),
    }

    Ok(())
}