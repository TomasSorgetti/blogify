use crate::events::event::Event;

pub async fn handle(event: Event) {
    println!(
        "Article {:?} read by {:?} for {:?} seconds",
        event.articleId,
        event.userId,
        event.duration
    );

    // Save in DB
    // Update metrics
}