export default class RedisService {
  constructor(client) {
    if (!client) {
      throw new Error("Redis client is required");
    }
    this.client = client;
  }

  async set(key, value, { ttl = 3600, tags = [] } = {}) {
    await this.client.set(key, JSON.stringify(value), { EX: ttl });
    
    if (tags.length > 0) {
      for (const tag of tags) {
        await this.client.sAdd(`tag:${tag}`, key);
      }
    }
  }

  async get(key) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key) {
    await this.client.del(key);
  }

  async invalidate(tags = []) {
    if (tags.length === 0) return;

    for (const tag of tags) {
      const setKey = `tag:${tag}`;
      const keys = await this.client.sMembers(setKey);
      
      if (keys.length > 0) {
        await this.client.del(keys);
        await this.client.del(setKey);
      }
    }
  }
}
