import CategoryRepository from "../../../../infrastructure/database/repositories/category.repository.js";

export const registerCategoryRepository = (container, models) => {
  container.register(
    "categoryRepository",
    new CategoryRepository(models.Category),
  );
};
