import WorkbenchRepository from "../../../../infrastructure/database/repositories/workbench.repository.js";

export const registerWorkbenchRepository = (container, models) => {
  container.register(
    "workbenchRepository",
    new WorkbenchRepository(models.Workbench),
  );
};
