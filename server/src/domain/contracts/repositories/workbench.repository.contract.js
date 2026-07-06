import { enforceContract } from "../contract.helper.js";

export class WorkbenchRepositoryContract {
  constructor() {
    enforceContract(this, WorkbenchRepositoryContract);
  }

  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findByOwner(userId) {
    throw new Error(`${this.constructor.name}: method [findByOwner] must be implemented.`);
  }

  async findByUserId(userId) {
    throw new Error(`${this.constructor.name}: method [findByUserId] must be implemented.`);
  }

  async findActiveByUserId(userId) {
    throw new Error(`${this.constructor.name}: method [findActiveByUserId] must be implemented.`);
  }

  async userBelongsToWorkbench(data) {
    throw new Error(`${this.constructor.name}: method [userBelongsToWorkbench] must be implemented.`);
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

  async findByMember(userId) {
    throw new Error(`${this.constructor.name}: method [findByMember] must be implemented.`);
  }

  async archiveMany(workbenchIds) {
    throw new Error(`${this.constructor.name}: method [archiveMany] must be implemented.`);
  }

  async unarchiveMany(workbenchIds) {
    throw new Error(`${this.constructor.name}: method [unarchiveMany] must be implemented.`);
  }

  async countByOwner(userId) {
    throw new Error(`${this.constructor.name}: method [countByOwner] must be implemented.`);
  }
}
