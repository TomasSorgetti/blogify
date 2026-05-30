import successResponse from "../utils/success-response.js";

export default class UserController {
  #getProfileUseCase;
  #updateProfileUseCase;
  #changePasswordUseCase;
  #searchUsersUseCase;

  constructor({ getProfileUseCase, updateProfileUseCase, changePasswordUseCase, searchUsersUseCase }) {
    this.#getProfileUseCase = getProfileUseCase;
    this.#updateProfileUseCase = updateProfileUseCase;
    this.#changePasswordUseCase = changePasswordUseCase;
    this.#searchUsersUseCase = searchUsersUseCase;
  }

  async profile(req, res) {
    const user = req.user;
    const data = await this.#getProfileUseCase.execute(user._id);
    return successResponse(res, data, "User retrieved successfully", 200);
  }

  async updateProfile(req, res) {
    const userId = req.user._id;
    const userData = req.body;
    const file = req.file;

    const data = await this.#updateProfileUseCase.execute(
      userId,
      userData,
      file,
    );

    return successResponse(res, data, "User updated successfully", 200);
  }

  async changePassword(req, res) {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const data = await this.#changePasswordUseCase.execute(userId, {
      currentPassword,
      newPassword,
    });

    return successResponse(res, data, "Password updated successfully", 200);
  }

  async changeEmail(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async searchUsers(req, res) {
    const { q } = req.query;
    const data = await this.#searchUsersUseCase.execute(q);
    return successResponse(res, data, "Users found successfully", 200);
  }

  async deleteProfile(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async getAllUsers(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async getUserById(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async createUser(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async deleteUser(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async changeRole(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }

  async deleteSessions(req, res) {
    const data = {};
    return successResponse(res, data, "Users retrieved successfully", 200);
  }
}
