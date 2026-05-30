export class StorageServiceContract {
  async uploadFile(file, path, options = {}) {
    throw new Error(`${this.constructor.name}: method [uploadFile] must be implemented.`);
  }

  async deleteFile(path) {
    throw new Error(`${this.constructor.name}: method [deleteFile] must be implemented.`);
  }

  async getFileUrl(path) {
    throw new Error(`${this.constructor.name}: method [getFileUrl] must be implemented.`);
  }
}
