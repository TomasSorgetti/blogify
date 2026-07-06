import { enforceContract } from "../contract.helper.js";

export class CacheServiceContract {
  constructor() {
    enforceContract(this, CacheServiceContract);
  }

  async get(key) {
    throw new Error(`${this.constructor.name}: method [get] must be implemented.`);
  }

  async set(key, value, ttl = null) {
    throw new Error(`${this.constructor.name}: method [set] must be implemented.`);
  }

  async delete(key) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }

  async clear() {
    throw new Error(`${this.constructor.name}: method [clear] must be implemented.`);
  }
}
