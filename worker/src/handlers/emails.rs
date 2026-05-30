use crate::events::event::EventEnvelope;
use crate::events::payloads::EmailRequestedPayload;
use std::env;
use reqwest::Client;
use serde_json::json;

pub async fn handle(event: EventEnvelope<EmailRequestedPayload>) -> Result<(), Box<dyn std::error::Error>> {
    println!("[EmailHandler] Processing email for: {}", event.payload.to);

    let resend_api_key = env::var("RESEND_API_KEY").expect("RESEND_API_KEY must be set");
    let client = Client::new();

    // In a real scenario, we would use the template and context to build the HTML.
    // For now, we'll just send a simple email or use the template name.
    let html = format!(
        "<h1>Email Template: {}</h1><p>Context: {}</p>",
        event.payload.template,
        event.payload.context
    );

    let response = client
        .post("https://api.resend.com/emails")
        .header("Authorization", format!("Bearer {}", resend_api_key))
        .json(&json!({
            "from": "Blogify <onboarding@resend.dev>",
            "to": [event.payload.to],
            "subject": event.payload.subject,
            "html": html,
        }))
        .send()
        .await?;

    if response.status().is_success() {
        println!("[EmailHandler] Email sent successfully");
        Ok(())
    } else {
        let error_text = response.text().await?;
        eprintln!("[EmailHandler] Failed to send email: {}", error_text);
        Err(format!("Resend API error: {}", error_text).into())
    }
}
