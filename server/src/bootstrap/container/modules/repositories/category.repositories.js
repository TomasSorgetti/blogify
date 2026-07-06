import CategoryRepository from "../../../../infrastructure/modules/category/category.repository.js";

export const registerCategoryRepository = (container, models) => {
  container.register(
    "categoryRepository",
    new CategoryRepository(models.Category),
  );
};
