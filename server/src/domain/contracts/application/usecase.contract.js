export class UseCaseContract {
  async execute(payload) {
    throw new Error(`${this.constructor.name}: method [execute] must be implemented.`);
  }
}
