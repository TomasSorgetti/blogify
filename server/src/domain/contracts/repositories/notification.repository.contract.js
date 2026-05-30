export class NotificationRepositoryContract {
  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findByUser(userId, options = {}) {
    throw new Error(`${this.constructor.name}: method [findByUser] must be implemented.`);
  }

  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async markAllAsRead(userId) {
    throw new Error(`${this.constructor.name}: method [markAllAsRead] must be implemented.`);
  }

  async markAsRead(id) {
    throw new Error(`${this.constructor.name}: method [markAsRead] must be implemented.`);
  }

  async delete(id) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }
}
