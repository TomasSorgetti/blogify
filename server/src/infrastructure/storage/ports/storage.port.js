export class StoragePort {
  async upload(file, pathFolder = "", options = {}) {
    throw new Error("Method upload() must be implemented");
  }

  async delete(key) {
    throw new Error("Method delete() must be implemented");
  }

  async update(file, oldKey, pathFolder = "", options = {}) {
    throw new Error("Method update() must be implemented");
  }

  getUrl(key) {
    throw new Error("Method getUrl() must be implemented");
  }
}
