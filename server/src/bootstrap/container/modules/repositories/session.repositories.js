import SessionRepository from "../../../../infrastructure/database/repositories/session.repository.js";

export const registerSessionRepository = (container, models) => {
  container.register("sessionRepository", new SessionRepository(models.Session));
};
