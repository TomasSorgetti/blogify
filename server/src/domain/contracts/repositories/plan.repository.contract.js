export class PlanRepositoryContract {
  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findByName(name) {
    throw new Error(`${this.constructor.name}: method [findByName] must be implemented.`);
  }

  async findAllActive() {
    throw new Error(`${this.constructor.name}: method [findAllActive] must be implemented.`);
  }

  async create(planData) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async update(planId, updateData) {
    throw new Error(`${this.constructor.name}: method [update] must be implemented.`);
  }

  async deactivate(planId) {
    throw new Error(`${this.constructor.name}: method [deactivate] must be implemented.`);
  }

  async getStripePriceId(planId) {
    throw new Error(`${this.constructor.name}: method [getStripePriceId] must be implemented.`);
  }
}
