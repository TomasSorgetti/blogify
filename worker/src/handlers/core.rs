use crate::events::event::EventEnvelope;
use crate::events::payloads::ActivityLoggedPayload;
use sqlx::PgPool;
use chrono::{DateTime, Utc};

pub async fn handle(
    event: EventEnvelope<ActivityLoggedPayload>,
    pool: &PgPool,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("[CoreHandler] Logging activity for user: {}", event.payload.user_id);

    let occurred_at = DateTime::from_timestamp(event.occurred_at / 1000, 0)
        .unwrap_or(Utc::now())
        .naive_utc();

    sqlx::query(
        r#"
        INSERT INTO activity_logs (event_id, event_type, occurred_at, payload)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (event_id) DO NOTHING
        "#,
    )
    .bind(event.event_id)
    .bind(&event.event_type)
    .bind(occurred_at)
    .bind(serde_json::to_value(&event.payload)?)
    .execute(pool)
    .await?;

    Ok(())
}
