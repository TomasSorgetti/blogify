import { InvalidInputError } from "../errors/index.js";
import ERROR_CODES from "../errors/errorCodes.js";

export default class ApiKeyEntity {
  #id;
  #key;
  #userId;
  #workbenchId;
  #name;
  #scopes;
  #expiresAt;
  #isActive;
  #createdAt;
  #updatedAt;

  constructor(data = {}) {
    this.#id = data._id || data.id;
    this.#key = data.key;
    this.#userId = data.userId;
    this.#workbenchId = data.workbenchId;
    this.#name = data.name;
    this.#scopes = data.scopes || [];
    this.#expiresAt = data.expiresAt;
    this.#isActive = data.isActive !== undefined ? data.isActive : true;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }

  get id() {
    return this.#id;
  }
  get key() {
    return this.#key;
  }
  get userId() {
    return this.#userId;
  }
  get workbenchId() {
    return this.#workbenchId;
  }
  get name() {
    return this.#name;
  }
  get scopes() {
    return [...this.#scopes];
  }
  get expiresAt() {
    return this.#expiresAt;
  }
  get isActive() {
    return this.#isActive;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }

  toObject() {
    return {
      id: this.#id,
      key: this.#key,
      userId: this.#userId,
      workbenchId: this.#workbenchId,
      name: this.#name,
      scopes: this.#scopes,
      expiresAt: this.#expiresAt,
      isActive: this.#isActive,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }

  static validate(data) {
    if (!data.userId) {
      throw new InvalidInputError("User ID is required", {
        field: "userId",
        code: ERROR_CODES.VALIDATION.MISSING_FIELD,
      });
    }
    if (data.key && typeof data.key !== "string") {
      throw new InvalidInputError("API Key must be a string", {
        field: "key",
        code: ERROR_CODES.VALIDATION.INVALID_INPUT,
      });
    }
    return true;
  }
}
