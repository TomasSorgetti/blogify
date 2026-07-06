import CategoryController from "../../../../infrastructure/modules/category/category.controller.js";

export const registerCategoryControllers = (container) => {
  const resolveDependency = (name) => container.resolve(name);

  container.register(
    "categoryController",
    new CategoryController({
      getAllCategoriesUseCase: resolveDependency("getAllCategoriesUseCase"),
      getCategoryUseCase: resolveDependency("getCategoryUseCase"),
      createCategoryUseCase: resolveDependency("createCategoryUseCase"),
      updateCategoryUseCase: resolveDependency("updateCategoryUseCase"),
      deleteCategoryUseCase: resolveDependency("deleteCategoryUseCase"),
    }),
  );
};
