import { enforceContract } from "../contract.helper.js";

export class EmailServiceContract {
  constructor() {
    enforceContract(this, EmailServiceContract);
  }

  async sendEmail(to, subject, body, options = {}) {
    throw new Error(`${this.constructor.name}: method [sendEmail] must be implemented.`);
  }

  async sendTemplateEmail(to, templateId, templateData, options = {}) {
    throw new Error(`${this.constructor.name}: method [sendTemplateEmail] must be implemented.`);
  }
}
