use crate::events::event::EventEnvelope;
use crate::events::payloads::{AiSummaryRequestedPayload, AiSummaryCompletedPayload};
use redis::aio::MultiplexedConnection;
use redis::AsyncCommands;
use std::env;
use reqwest::Client;
use serde_json::json;
use uuid::Uuid;
use chrono::Utc;

pub async fn handle(
    event: EventEnvelope<AiSummaryRequestedPayload>,
    redis_con: &mut MultiplexedConnection,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("[AiHandler] Processing AI summary for article: {}", event.payload.article_id);

    let ai_api_key = env::var("GOOGLE_GENERATIVE_AI_API_KEY").expect("GOOGLE_GENERATIVE_AI_API_KEY must be set");
    let client = Client::new();

    // Call Gemini API
    let response = client
        .post(format!("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={}", ai_api_key))
        .json(&json!({
            "contents": [{
                "parts": [{
                    "text": format!("Please provide a short summary of the following content: {}", event.payload.content)
                }]
            }]
        }))
        .send()
        .await?;

    let response_data: serde_json::Value = response.json().await?;
    let summary = response_data["candidates"][0]["content"]["parts"][0]["text"]
        .as_str()
        .unwrap_or("Failed to generate summary")
        .to_string();

    println!("[AiHandler] Summary generated, publishing response...");

    // Publish AI_SUMMARY_COMPLETED to events:inbox:node
    let response_envelope = EventEnvelope {
        event_id: Uuid::new_v4(),
        event_type: "AI_SUMMARY_COMPLETED".to_string(),
        schema_version: 1,
        occurred_at: Utc::now().timestamp_millis(),
        payload: AiSummaryCompletedPayload {
            article_id: event.payload.article_id,
            summary,
        },
    };

    let response_json = serde_json::to_string(&response_envelope)?;
    
    redis_con.xadd::<&str, &str, &str, String, ()>(
        "events:inbox:node",
        "*",
        &[("event", response_json)]
    ).await?;

    Ok(())
}
