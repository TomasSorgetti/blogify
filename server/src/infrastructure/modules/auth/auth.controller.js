import successResponse from "../../http/utils/success-response.js";

const isProduction = process.env.NODE_ENV === "production";

const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge: 28 * 24 * 60 * 60 * 1000,
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge: 28 * 24 * 60 * 60 * 1000,
};

export default class AuthController {
  #loginUseCase;
  #registerUseCase;
  #verifyUseCase;
  #logoutUseCase;
  #refreshUseCase;
  #loginWithGoogleUseCase;
  #resendCodeUseCase;

  constructor({
    loginUseCase,
    registerUseCase,
    verifyUseCase,
    logoutUseCase,
    refreshUseCase,
    loginWithGoogleUseCase,
    resendCodeUseCase,
  }) {
    this.#loginUseCase = loginUseCase;
    this.#registerUseCase = registerUseCase;
    this.#verifyUseCase = verifyUseCase;
    this.#logoutUseCase = logoutUseCase;
    this.#refreshUseCase = refreshUseCase;
    this.#loginWithGoogleUseCase = loginWithGoogleUseCase;
    this.#resendCodeUseCase = resendCodeUseCase;
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

    res.cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

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
    const { email } = req.body;
    await this.#resendCodeUseCase.execute({ email });
    return successResponse(res, null, "Verification code resent successfully", 200);
  }

  async refreshToken(req, res) {
    const refreshToken = req.cookies?.refreshToken;

    const { newAccesToken, newRefreshToken } =
      await this.#refreshUseCase.execute(refreshToken);

    res.cookie("accessToken", newAccesToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);

    return successResponse(res, null, "Token refreshed successfully", 201);
  }

  async logout(req, res) {
    const { id: userId, sessionId } = req.user;

    await this.#logoutUseCase.execute({ userId, sessionId });

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
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

    res.cookie("accessToken", accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return successResponse(
      res,
      { user, sessionId },
      "Auth retrieved successfully",
      200,
    );
  }
}
