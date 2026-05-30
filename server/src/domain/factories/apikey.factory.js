import ApiKeyEntity from "../entities/apikey.entity.js";

export default class ApiKeyFactory {
  create({
    _id,
    id,
    key,
    userId,
    workbenchId,
    name,
    scopes = ["read:articles"],
    expiresAt,
    isActive = true,
    createdAt,
    updatedAt,
  }) {
    ApiKeyEntity.validate({ userId, key });
    return new ApiKeyEntity({
      id: _id || id,
      key,
      userId,
      workbenchId,
      name,
      scopes,
      expiresAt,
      isActive,
      createdAt,
      updatedAt,
    });
  }
}
