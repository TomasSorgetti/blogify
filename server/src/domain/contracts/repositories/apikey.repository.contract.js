export class ApiKeyRepositoryContract {
  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async getById(id) {
    throw new Error(`${this.constructor.name}: method [getById] must be implemented.`);
  }

  async getByKey(key) {
    throw new Error(`${this.constructor.name}: method [getByKey] must be implemented.`);
  }

  async listByUser(userId) {
    throw new Error(`${this.constructor.name}: method [listByUser] must be implemented.`);
  }

  async validate(key) {
    throw new Error(`${this.constructor.name}: method [validate] must be implemented.`);
  }

  async deactivate(key) {
    throw new Error(`${this.constructor.name}: method [deactivate] must be implemented.`);
  }

  async activate(key) {
    throw new Error(`${this.constructor.name}: method [activate] must be implemented.`);
  }

  async delete(key) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }

  async deleteAllByUser(userId) {
    throw new Error(`${this.constructor.name}: method [deleteAllByUser] must be implemented.`);
  }

  async regenerate(oldKey, newKey) {
    throw new Error(`${this.constructor.name}: method [regenerate] must be implemented.`);
  }
}
