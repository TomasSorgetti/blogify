export class CategoryRepositoryContract {
  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findAll(filters) {
    throw new Error(`${this.constructor.name}: method [findAll] must be implemented.`);
  }

  async findOrCreate(name, userId) {
    throw new Error(`${this.constructor.name}: method [findOrCreate] must be implemented.`);
  }

  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async update(_id, createdBy, data) {
    throw new Error(`${this.constructor.name}: method [update] must be implemented.`);
  }

  async delete(_id, createdBy) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }
}
