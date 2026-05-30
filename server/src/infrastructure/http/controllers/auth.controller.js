import successResponse from "../utils/success-response.js";

export default class AuthController {
  #loginUseCase;
  #registerUseCase;
  #verifyUseCase;
  #logoutUseCase;
  #refreshUseCase;
  #loginWithGoogleUseCase;

  constructor({
    loginUseCase,
    registerUseCase,
    verifyUseCase,
    logoutUseCase,
    refreshUseCase,
    loginWithGoogleUseCase,
  }) {
    this.#loginUseCase = loginUseCase;
    this.#registerUseCase = registerUseCase;
    this.#verifyUseCase = verifyUseCase;
    this.#logoutUseCase = logoutUseCase;
    this.#refreshUseCase = refreshUseCase;
    this.#loginWithGoogleUseCase = loginWithGoogleUseCase;
  }

  async login(req, res) {
    const { email, password, rememberme } = req.body;

    const userAgent = req.get("user-agent") || "unknown";
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const { accessToken, refreshToken, user, sessionId } =
      await this.#loginUseCase.execute({
        email,
        password,
        rememberme,
        userAgent,
        ip,
      });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    return successResponse(
      res,
      { user, sessionId },
      "Auth retrieved successfully",
      200,
    );
  }

  async register(req, res) {
    const { username, email, password, workbench, preferences } =
      req.body;

    const response = await this.#registerUseCase.execute({
      username,
      email,
      password,
      workbench,
      preferences,
    });
    return successResponse(
      res,
      response,
      "User registered successfully. Please verify your email to activate your account.",
      201,
    );
  }

  async verifyEmail(req, res) {
    const { token } = req.query;
    const data = await this.#verifyUseCase.execute(token);
    return successResponse(res, data, "User verified successfully", 201);
  }

  async resendVerificationCode(req, res) {
    const data = {};
    return successResponse(res, data, "Auth retrieved successfully", 200);
  }

  async refreshToken(req, res) {
    const refreshToken = req.cookies?.refreshToken;

    const { newAccesToken, newRefreshToken } =
      await this.#refreshUseCase.execute(refreshToken);

    res.cookie("accessToken", newAccesToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, null, "Token refreshed successfully", 201);
  }

  async logout(req, res) {
    const { id: userId, sessionId } = req.user;

    await this.#logoutUseCase.execute({ userId, sessionId });

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
      secure: false,
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
      secure: false,
      path: "/",
    });

    return successResponse(res, null, "User logged out successfully", 200);
  }

  async loginWithGoogle(req, res) {
    const { idToken, rememberme } = req.body;
    const userAgent = req.get("user-agent") || "unknown";
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const { accessToken, refreshToken, user, sessionId } =
      await this.#loginWithGoogleUseCase.execute({
        idToken,
        rememberme,
        userAgent,
        ip,
      });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });

    return successResponse(
      res,
      { user, sessionId },
      "Auth retrieved successfully",
      200,
    );
  }
}
