import { NotFoundError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class UpdateArticleUseCase extends UseCaseContract {
  #articleRepository;
  #workbenchRepository;
  #notificationRepository;
  #socketService;
  #storageService;
  #articleFactory;
  #notificationFactory;

  constructor({
    articleRepository,
    workbenchRepository,
    notificationRepository,
    socketService,
    storageService,
    articleFactory,
    notificationFactory,
  }) {
    super();
    this.#articleRepository = articleRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#notificationRepository = notificationRepository;
    this.#socketService = socketService;
    this.#storageService = storageService;
    this.#articleFactory = articleFactory;
    this.#notificationFactory = notificationFactory;
  }

  async execute(userId, articleData, file) {
    const existingArticle = await this.#articleRepository.findBySlug(articleData.slug);
    if (!existingArticle) throw new NotFoundError("Article not found");

    if (!existingArticle.isGlobal) {
      const workbenchObj = await this.#workbenchRepository.findById(existingArticle.workbench);
      if (!workbenchObj) throw new NotFoundError("Workbench not found");

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
        throw new Error("You do not have permission to update articles in this workbench");
      }
    }

    let finalImage = articleData.image;

    if (file) {
      const uploadResult = await this.#storageService.update(
        file,
        existingArticle.image,
        "articles",
        { width: 1200, height: 675, quality: 85 }
      );
      finalImage = uploadResult.url;
    }

    const articleEntity = this.#articleFactory.create({
      ...articleData,
      image: finalImage
    });
    const article = articleEntity.toObject();

    const updatedArticle = await this.#articleRepository.update(
      article.slug,
      article,
    );

    const notificationEntity = this.#notificationFactory.create({
      userId: article.author,
      type: "activity",
      message: `¡${article.title} has been updated!`,
      link: `/article/${article.slug}`,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject(),
      );
      this.#socketService.sendNotification(article.author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return updatedArticle;
  }
}
