export class ArticleRepositoryContract {
  async findById(id) {
    throw new Error(`${this.constructor.name}: method [findById] must be implemented.`);
  }

  async findBySlug(slug) {
    throw new Error(`${this.constructor.name}: method [findBySlug] must be implemented.`);
  }

  async findAll(filters = {}, options = {}) {
    throw new Error(`${this.constructor.name}: method [findAll] must be implemented.`);
  }

  async findAllByWorkbench(filters = {}, workbenchId, options = {}) {
    throw new Error(`${this.constructor.name}: method [findAllByWorkbench] must be implemented.`);
  }

  async search(query, filters = {}, options = {}) {
    throw new Error(`${this.constructor.name}: method [search] must be implemented.`);
  }

  async findAllGlobal(filters = {}, options = {}) {
    throw new Error(`${this.constructor.name}: method [findAllGlobal] must be implemented.`);
  }

  async create(data) {
    throw new Error(`${this.constructor.name}: method [create] must be implemented.`);
  }

  async update(slug, data) {
    throw new Error(`${this.constructor.name}: method [update] must be implemented.`);
  }

  async delete(slug) {
    throw new Error(`${this.constructor.name}: method [delete] must be implemented.`);
  }

  async incrementViews(id) {
    throw new Error(`${this.constructor.name}: method [incrementViews] must be implemented.`);
  }

  async countByWorkbench(workbenchId) {
    throw new Error(`${this.constructor.name}: method [countByWorkbench] must be implemented.`);
  }
}
