/**
 * Enforces contract validation on instantiation.
 * Checks that the class is not directly instantiated, and that all abstract methods are implemented.
 * 
 * @param {object} instance - The concrete class instance (usually 'this').
 * @param {Function} contractClass - The contract/abstract class itself.
 */
export function enforceContract(instance, contractClass) {
  if (instance.constructor === contractClass) {
    throw new Error(`${contractClass.name} is an abstract class and cannot be instantiated directly.`);
  }

  const prototype = contractClass.prototype;
  const methods = Object.getOwnPropertyNames(prototype).filter(
    (prop) => prop !== "constructor" && typeof prototype[prop] === "function"
  );

  for (const method of methods) {
    if (
      typeof instance[method] !== "function" ||
      instance[method] === prototype[method]
    ) {
      throw new Error(
        `[Contract Error] Class ${instance.constructor.name} fails to implement abstract method [${method}] defined in ${contractClass.name}.`
      );
    }
  }
}
