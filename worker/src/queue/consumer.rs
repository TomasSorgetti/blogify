use redis::AsyncCommands;
use crate::config::redis::create_client;
use crate::config::database::create_pool;
use crate::handlers;
use std::time::Duration;
use tokio::time::sleep;

const STREAMS: &[&str] = &[
    "events:analytics",
    "events:core",
    "events:notifications",
    "events:emails",
    "events:ai",
];

const GROUP_NAME: &str = "workers:group";
const CONSUMER_NAME: &str = "worker:1";

pub async fn start_consumer() -> Result<(), Box<dyn std::error::Error>> {
    let client = create_client();
    let pool = create_pool().await;
    let mut con = client.get_multiplexed_tokio_connection().await?;

    // Create consumer groups if they don't exist
    for stream in STREAMS {
        let _: redis::RedisResult<()> = con.xgroup_create_mkstream(stream, GROUP_NAME, "$").await;
    }

    println!("[Consumer] Listening to streams: {:?}", STREAMS);

    loop {
        // XREADGROUP GROUP workers:group worker:1 BLOCK 2000 STREAMS events:analytics events:core ... > > >
        let ids = vec![">"; STREAMS.len()];
        let options = redis::streams::StreamReadOptions::default()
            .group(GROUP_NAME, CONSUMER_NAME)
            .block(2000)
            .count(10);

        let result: redis::RedisResult<redis::streams::StreamReadReply> = con.xread_options(STREAMS, &ids, &options).await;

        match result {
            Ok(reply) => {
                for stream in reply.keys {
                    for record in stream.ids {
                        let event_raw: String = record.get("event").unwrap_or_default();
                        
                        println!("[Consumer] Received event from {}: {}", stream.key, event_raw);

                        if let Err(e) = handlers::dispatch(event_raw, &pool, &mut con).await {
                            eprintln!("[Consumer] Error processing event: {}", e);
                            // TODO: Implement proper retry / DLQ logic here
                        } else {
                            // ACK the message
                            let _: redis::RedisResult<()> = con.xack(&stream.key, GROUP_NAME, &[&record.id]).await;
                        }
                    }
                }
            }
            Err(e) => {
                if e.kind() != redis::ErrorKind::IoError {
                     eprintln!("[Consumer] Redis error: {}", e);
                }
                sleep(Duration::from_millis(500)).await;
            }
        }
    }
}