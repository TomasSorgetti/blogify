import { enforceContract } from "../contract.helper.js";

export class SocketServiceContract {
  constructor() {
    enforceContract(this, SocketServiceContract);
  }

  async emitToUser(userId, event, data) {
    throw new Error(`${this.constructor.name}: method [emitToUser] must be implemented.`);
  }

  async broadcast(event, data) {
    throw new Error(`${this.constructor.name}: method [broadcast] must be implemented.`);
  }

  async emitToRoom(room, event, data) {
    throw new Error(`${this.constructor.name}: method [emitToRoom] must be implemented.`);
  }
}
