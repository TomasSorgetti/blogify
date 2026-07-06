import successResponse from "../../http/utils/success-response.js";

export default class CategoryController {
  #createCategoryUseCase;
  #updateCategoryUseCase;
  #deleteCategoryUseCase;
  #getAllCategoriesUseCase;
  #getCategoryUseCase;

  constructor({
    createCategoryUseCase,
    getAllCategoriesUseCase,
    getCategoryUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase,
  }) {
    this.#createCategoryUseCase = createCategoryUseCase;
    this.#updateCategoryUseCase = updateCategoryUseCase;
    this.#getAllCategoriesUseCase = getAllCategoriesUseCase;
    this.#getCategoryUseCase = getCategoryUseCase;
    this.#deleteCategoryUseCase = deleteCategoryUseCase;
  }

  async getGlobalCategories(req, res) {
    const data = await this.#getAllCategoriesUseCase.execute({
      isGlobal: true,
    });

    return successResponse(res, data, "Categories retrieved successfully", 200);
  }

  async getAll(req, res) {
    const userId = req.user._id;

    const data = await this.#getAllCategoriesUseCase.execute({ userId });

    return successResponse(res, data, "Category retrieved successfully", 200);
  }

  async getCategoryById(req, res) {
    const { id } = req.params;

    const data = await this.#getCategoryUseCase.execute({ id });
    return successResponse(res, data, "Category retrieved successfully", 200);
  }

  async createCategory(req, res) {
    const userId = req.user._id;
    const { name } = req.body;

    await this.#createCategoryUseCase.execute({
      name,
      userId,
    });

    return successResponse(res, null, "Category created successfully", 201);
  }

  async updateCategory(req, res) {
    const userId = req.user._id;
    const { id } = req.params;
    const { name } = req.body;

    await this.#updateCategoryUseCase.execute({ userId, id, name });

    return successResponse(res, null, "Category updated successfully", 201);
  }

  async deleteCategory(req, res) {
    const userId = req.user._id;
    const { id } = req.params;

    await this.#deleteCategoryUseCase.execute({ userId, id });

    return successResponse(res, null, "Category deleted successfully", 201);
  }
}
