import SessionRepository from "../../../../infrastructure/modules/session/session.repository.js";

export const registerSessionRepository = (container, models) => {
  container.register("sessionRepository", new SessionRepository(models.Session));
};
