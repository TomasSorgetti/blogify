mod config;
mod queue;
mod events;
mod handlers;

use queue::consumer::start_consumer;
use dotenvy::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    env_logger::init();

    println!("Worker started");

    if let Err(e) = start_consumer().await {
        eprintln!("Error at worker: {:?}", e);
        return Err(e);
    }

    Ok(())
}