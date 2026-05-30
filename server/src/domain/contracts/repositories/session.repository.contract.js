export class SessionRepositoryContract {
  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findByUserId(userId, filter = {}) {
    throw new Error(`${this.constructor.name}: method [findByUserId] must be implemented.`);
  }

  async findByRefreshToken(refreshToken) {
    throw new Error(`${this.constructor.name}: method [findByRefreshToken] must be implemented.`);
  }

  async update(id, data) {
    throw new Error(`${this.constructor.name}: method [update] must be implemented.`);
  }

  async invalidate(id) {
    throw new Error(`${this.constructor.name}: method [invalidate] must be implemented.`);
  }

  async deleteByRefreshToken(refreshToken) {
    throw new Error(`${this.constructor.name}: method [deleteByRefreshToken] must be implemented.`);
  }

  async deleteByUserId(userId) {
    throw new Error(`${this.constructor.name}: method [deleteByUserId] must be implemented.`);
  }

  async deleteByDevice(userId, userAgent, ip) {
    throw new Error(`${this.constructor.name}: method [deleteByDevice] must be implemented.`);
  }

  async deleteById(id) {
    throw new Error(`${this.constructor.name}: method [deleteById] must be implemented.`);
  }
}
