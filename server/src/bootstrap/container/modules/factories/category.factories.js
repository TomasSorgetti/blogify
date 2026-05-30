import CategoryFactory from "../../../../domain/factories/category.factory.js";

export const registerCategoryFactory = (container) => {
  container.register("categoryFactory", new CategoryFactory());
};
