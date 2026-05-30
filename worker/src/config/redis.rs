use redis::Client;
use std::env;

pub fn create_client() -> Client {
    let redis_url = env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".to_string());
    Client::open(redis_url).expect("Error creating Redis client")
}