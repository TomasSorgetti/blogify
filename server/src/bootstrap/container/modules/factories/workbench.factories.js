import WorkbenchFactory from "../../../../domain/factories/workbench.factory.js";

export const registerWorkbenchFactory = (container) => {
  container.register("workbenchFactory", new WorkbenchFactory());
};
