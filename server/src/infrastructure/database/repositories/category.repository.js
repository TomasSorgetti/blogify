import {
  RepositoryError,
  AlreadyExistsError,
  NotFoundError,
} from "../../../domain/errors/index.js";
import { CategoryRepositoryContract } from "../../../domain/contracts/repositories/category.repository.contract.js";

class CategoryRepository extends CategoryRepositoryContract {
  #model;

  constructor(model) {
    super();
    this.#model = model;
  }

  async findById(id) {
    try {
      return await this.#model.findById(id).lean().exec();
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findAll(filters = {}) {
    try {
      return await this.#model.find(filters).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findOrCreate(name, userId) {
    try {
      const slug = name.toLowerCase().trim().replace(/\s+/g, "-");
      const existing = await this.#model
        .findOne({ slug, createdBy: userId })
        .lean()
        .exec();

      if (existing) return existing;

      const created = new this.#model({ name: name.trim(), slug, createdBy: userId });
      const saved = await created.save();
      return saved.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const existing = await this.#model
          .findOne({ slug: name.toLowerCase().trim().replace(/\s+/g, "-"), createdBy: userId })
          .lean()
          .exec();
        if (existing) return existing;
      }
      throw new RepositoryError(err.message);
    }
  }

  async create(data) {
    try {
      const category = new this.#model(data);
      const savedCategory = await category.save();
      return savedCategory.toObject();
    } catch (err) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue || {})[0] || "Field";
        throw new AlreadyExistsError(`${key} already exists`);
      }
      throw new RepositoryError(err.message);
    }
  }

  async update(_id, createdBy, data) {
    try {
      const updatedCategory = await this.#model.findOneAndUpdate(
        { _id, createdBy },
        { $set: data },
        { new: true, lean: true },
      );

      if (!updatedCategory)
        throw new NotFoundError("Category not found or unauthorized");

      return updatedCategory;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }

  async delete(_id, createdBy) {
    try {
      const category = await this.#model
        .findOneAndDelete({ _id, createdBy })
        .lean()
        .exec();
      if (!category) throw new NotFoundError("Category not found");
      return { id: category._id };
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }
}

export default CategoryRepository;
