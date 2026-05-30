import { NotFoundError, InvalidInputError, ForbiddenError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";

export default class MoveKanbanCardUseCase extends UseCaseContract {
  #articleRepository;
  #workbenchRepository;
  #activityLogRepository;

  constructor({
    articleRepository,
    workbenchRepository,
    activityLogRepository,
  }) {
    super();
    this.#articleRepository = articleRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#activityLogRepository = activityLogRepository;
  }

  async execute(userId, { slug, kanbanColumn: rawKanbanColumn }) {
    const kanbanColumn = rawKanbanColumn?.toLowerCase();
    const existingArticle = await this.#articleRepository.findBySlug(slug);
    if (!existingArticle) throw new NotFoundError("Article not found");

    if (!existingArticle.workbench) {
      throw new InvalidInputError("Global articles cannot be moved in kanban");
    }

    const workbenchObj = await this.#workbenchRepository.findById(existingArticle.workbench);
    if (!workbenchObj) throw new NotFoundError("Workbench not found");

    const ownerId = workbenchObj.owner._id?.toString() || workbenchObj.owner.toString();
    let hasPermission = ownerId === userId.toString();

    if (!hasPermission) {
      const member = workbenchObj.members.find(
        (m) => (m.userId?.toString() === userId.toString()) || (m.userId?._id?.toString() === userId.toString())
      );
      if (member && (member.role === "editor" || member.role === "owner")) {
        hasPermission = true;
      }
    }

    if (!hasPermission) {
      throw new ForbiddenError("You do not have permission to move articles in this workbench");
    }

    const oldColumn = existingArticle.kanbanColumn || "idea";
    
    let status = existingArticle.status;
    if (kanbanColumn === "published") {
      status = "PUBLISHED";
    } else if (oldColumn === "published" && kanbanColumn !== "published") {
      status = "DRAFT";
    }

    const updatedArticle = await this.#articleRepository.update(slug, {
      kanbanColumn,
      status
    });

    try {
      await this.#activityLogRepository.save({
        userId,
        workbenchId: existingArticle.workbench,
        action: "moved",
        details: {
          articleTitle: existingArticle.title,
          articleSlug: slug,
          from: oldColumn,
          to: kanbanColumn
        }
      });
    } catch (err) {
      console.error(`Failed to log activity for article ${slug} in workbench ${existingArticle.workbench}:`, err);
    }

    return updatedArticle;
  }
}
