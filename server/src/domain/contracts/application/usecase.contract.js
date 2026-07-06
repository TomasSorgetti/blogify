import { enforceContract } from "../contract.helper.js";

export class UseCaseContract {
  constructor() {
    enforceContract(this, UseCaseContract);
  }

  async execute(payload) {
    throw new Error(`${this.constructor.name}: method [execute] must be implemented.`);
  }
}
