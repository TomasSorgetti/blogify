import WorkbenchRepository from "../../../../infrastructure/modules/workbench/workbench.repository.js";

export const registerWorkbenchRepository = (container, models) => {
  container.register(
    "workbenchRepository",
    new WorkbenchRepository(models.Workbench),
  );
};
