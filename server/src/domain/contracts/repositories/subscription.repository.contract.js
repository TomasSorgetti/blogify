export class SubscriptionRepositoryContract {
  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findByUserId(userId) {
    throw new Error(`${this.constructor.name}: method [findByUserId] must be implemented.`);
  }

  async findAll(filters = {}) {
    throw new Error(`${this.constructor.name}: method [findAll] must be implemented.`);
  }

  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async update(id, data) {
    throw new Error(`${this.constructor.name}: method [update] must be implemented.`);
  }

  async delete(id) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }
}
