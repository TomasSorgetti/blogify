import express from "express";
import catchAsync from "../../utils/async-handler.js";

export default class WorkbenchRouter {
  #router;
  #controller;
  #authMiddleware;
  #planLimitsMiddleware;
  #workbenchRepository;
  #rateLimiterMiddleware;

  constructor({
    workbenchController,
    authMiddleware,
    planLimitsMiddleware,
    workbenchRepository,
    rateLimiterMiddleware,
  }) {
    this.#router = express.Router();

    this.#controller = workbenchController;
    this.#authMiddleware = authMiddleware.handle.bind(authMiddleware);
    this.#planLimitsMiddleware = planLimitsMiddleware;
    this.#workbenchRepository = workbenchRepository;
    this.#rateLimiterMiddleware = rateLimiterMiddleware;

    this.#setupRoutes();
  }

  #setupRoutes() {
    this.#router.use(this.#rateLimiterMiddleware.handleGeneric());
    /**
     * @GET /api/workbenches
     */
    this.#router.get(
      "/",
      this.#authMiddleware,
      catchAsync(this.#controller.getAllWorkbenches.bind(this.#controller)),
    );
    /**
     * @POST /api/workbenches
     */
    this.#router.post(
      "/",
      this.#authMiddleware,
      this.#planLimitsMiddleware.checkLimit("workbenches", (req) =>
        this.#workbenchRepository.countByOwner(req.user._id),
      ),
      catchAsync(this.#controller.createWorkbench.bind(this.#controller)),
    );
    /**
     * @DELETE /api/workbenches/:deleteWorkbench
     */
    this.#router.delete(
      "/:workbenchId",
      this.#authMiddleware,
      catchAsync(this.#controller.deleteWorkbench.bind(this.#controller)),
    );

    this.#router.patch(
      "/:workbenchId",
      this.#authMiddleware,
      catchAsync(this.#controller.updateWorkbench.bind(this.#controller)),
    );

    /**
     * @POST /api/workbenches/:workbenchId/members
     */
    this.#router.post(
      "/:workbenchId/members",
      this.#authMiddleware,
      this.#planLimitsMiddleware.checkLimit("collaborators", async (req) => {
        const wb = await this.#workbenchRepository.findById(req.params.workbenchId);
        return wb.members.length;
      }),
      catchAsync(this.#controller.addMember.bind(this.#controller)),
    );

    /**
     * @DELETE /api/workbenches/:workbenchId/members/:targetUserId
     */
    this.#router.delete(
      "/:workbenchId/members/:targetUserId",
      this.#authMiddleware,
      catchAsync(this.#controller.removeMember.bind(this.#controller)),
    );

    /**
     * @PATCH /api/workbenches/:workbenchId/members/:targetUserId/role
     */
    this.#router.patch(
      "/:workbenchId/members/:targetUserId/role",
      this.#authMiddleware,
      catchAsync(this.#controller.updateMemberRole.bind(this.#controller)),
    );

    /**
     * @GET /api/workbenches/:workbenchId/activity
     */
    this.#router.get(
      "/:workbenchId/activity",
      this.#authMiddleware,
      catchAsync(this.#controller.getActivity.bind(this.#controller)),
    );
  }

  getRouter() {
    return this.#router;
  }
}
