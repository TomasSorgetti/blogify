import { enforceContract } from "../contract.helper.js";

export class PaymentServiceContract {
  constructor() {
    enforceContract(this, PaymentServiceContract);
  }

  async createCheckoutSession(data) {
    throw new Error(`${this.constructor.name}: method [createCheckoutSession] must be implemented.`);
  }

  async handleWebhook(payload, signature) {
    throw new Error(`${this.constructor.name}: method [handleWebhook] must be implemented.`);
  }

  async createCustomer(data) {
    throw new Error(`${this.constructor.name}: method [createCustomer] must be implemented.`);
  }

  async createSubscription(data) {
    throw new Error(`${this.constructor.name}: method [createSubscription] must be implemented.`);
  }
}
