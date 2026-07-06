export default class Container {
  constructor() {
    this.dependencies = {};
  }

  register(name, dependency) {
    this.dependencies[name] = dependency;
  }

  registerModule(registerFn, config) {
    registerFn(this, config);
  }

  resolve(name) {
    if (!this.dependencies[name]) {
      throw new Error(`Dependency '${name}' not found`);
    }
    return this.dependencies[name];
  }

  /**
   * Resolve multiple dependencies at once.
   * Prefer this over getDependencies() to avoid exposing the full tree.
   * @param {string[]} names
   */
  resolveMany(names) {
    return names.reduce((acc, name) => {
      acc[name] = this.resolve(name);
      return acc;
    }, {});
  }

  getDependencies() {
    return this.dependencies;
  }
}
