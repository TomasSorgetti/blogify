import SessionFactory from "../../../../domain/factories/session.factory.js";

export const registerSessionFactory = (container) => {
  container.register("sessionFactory", new SessionFactory());
};
