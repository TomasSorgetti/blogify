import { enforceContract } from "../contract.helper.js";

export class QueueServiceContract {
  constructor() {
    enforceContract(this, QueueServiceContract);
  }

  async publish(queue, message, options = {}) {
    throw new Error(`${this.constructor.name}: method [publish] must be implemented.`);
  }

  async subscribe(queue, callback) {
    throw new Error(`${this.constructor.name}: method [subscribe] must be implemented.`);
  }
}
