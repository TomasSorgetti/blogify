import { createClient } from 'redis';
import crypto from 'crypto';

export class EventBus {
  #client;

  constructor(redisUrl) {
    this.#client = createClient({ url: redisUrl });
    this.#client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async connect() {
    if (!this.#client.isOpen) {
      await this.#client.connect();
    }
  }

  async publish(stream, eventType, payload, schemaVersion = 1) {
    await this.connect();

    const envelope = {
      eventId: crypto.randomUUID(),
      eventType,
      schemaVersion,
      occurredAt: Date.now(),
      payload: JSON.stringify(payload),
    };

    // Redis XADD expects key-value pairs
    // We'll store the entire envelope as a single field 'event' for simplicity in parsing
    await this.#client.xAdd(stream, '*', {
      event: JSON.stringify(envelope)
    });

    console.log(`[EventBus] Published ${eventType} to ${stream}`);
  }

  async disconnect() {
    await this.#client.disconnect();
  }
}
