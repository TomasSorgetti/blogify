import { UnauthorizedError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class CreateArticleUseCase extends UseCaseContract {
  #articleRepository;
  #workbenchRepository;
  #categoryRepository;
  #notificationRepository;
  #socketService;
  #storageService;
  #articleFactory;
  #notificationFactory;

  constructor({
    articleRepository,
    workbenchRepository,
    categoryRepository,
    notificationRepository,
    socketService,
    storageService,
    articleFactory,
    notificationFactory,
  }) {
    super();
    this.#articleRepository = articleRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#categoryRepository = categoryRepository;
    this.#notificationRepository = notificationRepository;
    this.#socketService = socketService;
    this.#storageService = storageService;
    this.#articleFactory = articleFactory;
    this.#notificationFactory = notificationFactory;
  }

  async execute({
    title,
    slug,
    content,
    summary,
    author,
    tags,
    status,
    image,
    file,
    isFeatured,
    categories = [],
    newCategories = [],
    workbench,
    isGlobal = false,
    language = "en",
  }) {
    if (!isGlobal) {
      const workbenchObj = await this.#workbenchRepository.findById(workbench);
      if (!workbenchObj) {
        throw new UnauthorizedError("Workbench not found");
      }

      const ownerId = workbenchObj.owner._id?.toString() || workbenchObj.owner.toString();
      let hasPermission = ownerId === author.toString();

      if (!hasPermission) {
        const member = workbenchObj.members.find(
          (m) => m.userId.toString() === author.toString() || m.userId?._id?.toString() === author.toString()
        );
        if (member && (member.role === "editor" || member.role === "owner")) {
          hasPermission = true;
        }
      }

      if (!hasPermission) {
        throw new UnauthorizedError(
          "You do not have permission to create articles in this workbench",
        );
      }
    }

    let finalImage = image;

    if (file) {
      const uploadResult = await this.#storageService.upload(file, "articles", { 
        width: 1200, 
        height: 675, // 16:9 
        quality: 85 
      });
      finalImage = uploadResult.url;
    }

    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    const resolvedCategoryIds = [];

    const allCategories = [...new Set([...categories, ...newCategories])];

    if (allCategories.length > 0) {
      const createdOrFound = await Promise.all(
        allCategories.map(async (catItem) => {
          if (objectIdRegex.test(catItem)) {
            return { _id: catItem };
          }
          return await this.#categoryRepository.findOrCreate(catItem, author);
        }),
      );

      createdOrFound.forEach((cat) => {
        const id = (cat._id || cat.id).toString();
        if (!resolvedCategoryIds.includes(id)) {
          resolvedCategoryIds.push(id);
        }
      });
    }

    const newArticle = this.#articleFactory.create({
      title,
      slug,
      content,
      summary,
      author,
      tags: Array.isArray(tags) ? tags : [],
      status: status ? status.toUpperCase() : undefined,
      image: finalImage,
      isFeatured,
      language,
      categories: resolvedCategoryIds,
      workbench,
      isGlobal,
    });

    const createdArticle = await this.#articleRepository.create(newArticle.toObject());

    const notificationEntity = this.#notificationFactory.create({
      userId: author,
      type: "activity",
      message: `New article created: ${title}`,
      link: `/articles/${slug}`,
    });

    try {
      const notification = await this.#notificationRepository.create(
        notificationEntity.toObject(),
      );
      this.#socketService.sendNotification(author, notification);
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return createdArticle;
  }
}
