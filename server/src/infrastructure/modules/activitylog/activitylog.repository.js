class ActivityLogRepository {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async save(logData) {
    const log = new this.#model(logData);
    return await log.save();
  }

  async findByWorkbench(workbenchId, limit = 20) {
    return await this.#model.find({ workbenchId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}

export default ActivityLogRepository;
