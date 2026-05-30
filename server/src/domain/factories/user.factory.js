import UserEntity from "../entities/user.entity.js";

export default class UserFactory {
  create({
    _id,
    id,
    username,
    email,
    password = null,
    role = "user",
    avatar = null,
    bio = "",
    isVerified = false,
    preferences = null,
    subscription = null,
    sessions = [],
    workbenches = [],
  }) {
    return new UserEntity({
      id: _id || id,
      username,
      email,
      password,
      role,
      avatar,
      bio,
      isVerified,
      preferences: preferences || {
        theme: "light",
        notifications: {
          articles: true,
          comments: true,
          api_alerts: true,
          billing: true,
          newsletter: false,
        },
      },
      subscription,
      sessions,
      workbenches,
    });
  }

  createAdmin({ _id, id, username, email, password, avatar = null }) {
    return new UserEntity({
      id: _id || id,
      username,
      email,
      password,
      avatar,
      role: "admin",
      isVerified: true,
    });
  }

  createWithOAuth({
    _id,
    id,
    username,
    email,
    provider,
    providerId,
    avatar = null,
  }) {
    const user = new UserEntity({
      id: _id || id,
      username,
      email,
      avatar,
      role: "user",
      isVerified: true,
      loginMethods: [
        {
          provider,
          providerId,
          addedAt: new Date(),
        },
      ],
    });

    return user;
  }

  validateUpdate(data) {
    return UserEntity.validateUpdate(data);
  }
}
