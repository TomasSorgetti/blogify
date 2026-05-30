use crate::events::event::EventEnvelope;
use crate::events::payloads::ArticleViewedPayload;
use sqlx::PgPool;
use chrono::{DateTime, Utc};

pub async fn handle(
    event: EventEnvelope<ArticleViewedPayload>,
    pool: &PgPool,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("[AnalyticsHandler] Processing view for article: {}", event.payload.article_id);

    let occurred_at = DateTime::from_timestamp(event.occurred_at / 1000, 0)
        .unwrap_or(Utc::now())
        .naive_utc()
        .date();

    sqlx::query(
        r#"
        INSERT INTO article_views_aggregation (article_id, view_date, total_views)
        VALUES ($1, $2, 1)
        ON CONFLICT (article_id, view_date)
        DO UPDATE SET total_views = article_views_aggregation.total_views + 1
        "#,
    )
    .bind(&event.payload.article_id)
    .bind(occurred_at)
    .execute(pool)
    .await?;

    Ok(())
}
