import mongoose from "mongoose";
import {
  RepositoryError,
  AlreadyExistsError,
  NotFoundError,
} from "../../../domain/errors/index.js";
import { WorkbenchRepositoryContract } from "../../../domain/contracts/repositories/workbench.repository.contract.js";

export default class WorkbenchRepository extends WorkbenchRepositoryContract {
  #model;

  constructor(model) {
    super();
    this.#model = model;
  }

  async findById(id) {
    try {
      const workbench = await this.#model.findById(id).lean().exec();
      if (!workbench) throw new NotFoundError("Workbench not found");
      return workbench;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findByOwner(userId) {
    try {
      return await this.#model.find({ owner: userId }).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findByUserId(userId) {
    try {
      return await this.#model
        .find({
          $or: [{ owner: userId }, { "members.userId": userId }],
        })
        .populate("owner", "username email avatar")
        .populate("members.userId", "username email avatar")
        .lean()
        .exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async findActiveByUserId(userId) {
    try {
      return await this.#model
        .find({
          $or: [{ owner: userId }, { "members.userId": userId }],
          isArchived: { $ne: true },
        })
        .populate("owner", "username email avatar")
        .populate("members.userId", "username email avatar")
        .lean()
        .exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async userBelongsToWorkbench(workbenchId, userId) {
    try {
      const id = new mongoose.Types.ObjectId(workbenchId);
      const uid = new mongoose.Types.ObjectId(userId);

      const workbench = await this.#model.findOne({
        _id: id,
        $or: [{ owner: uid }, { "members.userId": uid }],
      });

      return !!workbench;
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async create(workbenchData) {
    try {
      const workbench = new this.#model(workbenchData);
      await workbench.save();
      return await this.#model
        .findById(workbench._id)
        .populate("owner", "username email avatar")
        .populate("members.userId", "username email avatar")
        .lean()
        .exec();
    } catch (err) {
      if (err.code === 11000) {
        throw new AlreadyExistsError("Workbench already exists");
      }
      throw new RepositoryError(err.message);
    }
  }

  async update(workbenchId, updateData) {
    try {
      const updated = await this.#model
        .findByIdAndUpdate(workbenchId, updateData, { new: true })
        .lean()
        .exec();
      if (!updated) throw new NotFoundError("Workbench not found for update");
      return updated;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }

  async delete(workbenchId) {
    try {
      const deleted = await this.#model
        .findByIdAndDelete(workbenchId)
        .lean()
        .exec();
      if (!deleted) throw new NotFoundError("Workbench not found for deletion");
      return deleted;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new RepositoryError(err.message);
    }
  }

  async findByMember(userId) {
    try {
      return await this.#model.find({ "members.userId": userId }).lean().exec();
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async countByOwner(userId) {
    try {
      return await this.#model.countDocuments({ owner: userId });
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async archiveMany(workbenchIds) {
    try {
      await this.#model.updateMany(
        { _id: { $in: workbenchIds } },
        { $set: { isArchived: true } }
      );
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }

  async unarchiveMany(workbenchIds) {
    try {
      await this.#model.updateMany(
        { _id: { $in: workbenchIds } },
        { $set: { isArchived: false } }
      );
    } catch (err) {
      throw new RepositoryError(err.message);
    }
  }
}
