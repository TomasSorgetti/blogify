use crate::events::event::EventEnvelope;
use crate::events::payloads::NotificationTriggeredPayload;
use sqlx::PgPool;

pub async fn handle(
    event: EventEnvelope<NotificationTriggeredPayload>,
    pool: &PgPool,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("[NotificationHandler] Processing notification for user: {}", event.payload.user_id);

    // Idempotency check
    let already_dispatched = sqlx::query(
        "SELECT event_id FROM dispatched_notifications WHERE event_id = $1",
    )
    .bind(event.event_id)
    .fetch_optional(pool)
    .await?;

    if already_dispatched.is_some() {
        println!("[NotificationHandler] Event {} already processed, skipping.", event.event_id);
        return Ok(());
    }

    // Logic to dispatch notification (e.g. via Socket.io or Push) would go here.
    println!("[NotificationHandler] Dispatching message: {}", event.payload.message);

    // Mark as dispatched
    sqlx::query(
        "INSERT INTO dispatched_notifications (event_id) VALUES ($1)",
    )
    .bind(event.event_id)
    .execute(pool)
    .await?;

    Ok(())
}
