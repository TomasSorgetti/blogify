import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class DeleteArticleUseCase extends UseCaseContract {
  #articleRepository;
  #workbenchRepository;
  #notificationRepository;
  #socketService;
  #notificationFactory;

  constructor({
    articleRepository,
    workbenchRepository,
    notificationRepository,
    socketService,
    notificationFactory,
  }) {
    super();
    this.#articleRepository = articleRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#notificationRepository = notificationRepository;
    this.#socketService = socketService;
    this.#notificationFactory = notificationFactory;
  }

  async execute(userId, slug) {
    const existingArticle = await this.#articleRepository.findBySlug(slug);
    if (!existingArticle) throw new Error("Article not found");

    if (!existingArticle.isGlobal) {
      const workbenchObj = await this.#workbenchRepository.findById(existingArticle.workbench);
      if (!workbenchObj) throw new Error("Workbench not found");

      const ownerId = workbenchObj.owner._id?.toString() || workbenchObj.owner.toString();
      let hasPermission = ownerId === userId.toString();

      if (!hasPermission) {
        const member = workbenchObj.members.find(
          (m) => m.userId.toString() === userId.toString() || m.userId?._id?.toString() === userId.toString()
        );
        if (member && (member.role === "editor" || member.role === "owner")) {
          hasPermission = true;
        }
      }

      if (!hasPermission) {
        throw new Error("You do not have permission to delete articles in this workbench");
      }
    }

    const deletedInfo = await this.#articleRepository.delete(slug);

    const notificationEntity = this.#notificationFactory.create({
      userId: deletedInfo.author,
      type: "activity",
      message: `¡Article ${deletedInfo.slug} has been deleted!`,
      link: null,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject(),
      );
      this.#socketService.sendNotification(deletedInfo.author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return deletedInfo;
  }
}
