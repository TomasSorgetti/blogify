import { NotFoundError, ValidationError } from "../../domain/errors/index.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class ChangePlanUseCase extends UseCaseContract {
  #subscriptionRepository;
  #planRepository;
  #workbenchRepository;
  #articleRepository;

  constructor({
    subscriptionRepository,
    planRepository,
    workbenchRepository,
    articleRepository,
  }) {
    super();
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#articleRepository = articleRepository;
  }

  async execute({
    userId,
    planId,
    archiveWorkbenchIds = [],
    unarchiveWorkbenchIds = [],
    archiveArticleIds = [],
  }) {
    const newPlan = await this.#planRepository.findById(planId);
    if (!newPlan) {
      throw new NotFoundError("Plan not found");
    }

    const keepLimit = newPlan.features?.workbenches || 1;
    const articlesLimit =
      newPlan.features?.articlesPerWorkbench === -1
        ? -1
        : newPlan.features?.articlesPerWorkbench || 3;

    const allWorkbenches = await this.#workbenchRepository.findByOwner(userId);
    const activeWorkbenches = allWorkbenches.filter((w) => !w.isArchived);
    const archivedWorkbenches = allWorkbenches.filter((w) => w.isArchived);

    const finalMutations = {
      archiveWorkbenchIds: [],
      unarchiveWorkbenchIds: [],
      archiveArticleIds: [],
      unarchiveArticleIds: [],
    };

    if (activeWorkbenches.length > keepLimit) {
      const overflow = activeWorkbenches.length - keepLimit;
      if (!archiveWorkbenchIds || archiveWorkbenchIds.length !== overflow) {
        throw new ValidationError(
          `You must select exactly ${overflow} workspace(s) to archive before downgrading.`,
          {
            needsSelection: true,
            type: "DOWNGRADE_WORKBENCHES",
            requiredCount: keepLimit,
          },
        );
      }
      
      finalMutations.archiveWorkbenchIds.push(...archiveWorkbenchIds);

      archiveWorkbenchIds.forEach((id) => {
        const strId = id.toString();
        const idx = activeWorkbenches.findIndex(
          (w) => w._id.toString() === strId,
        );
        if (idx !== -1) {
          archivedWorkbenches.push(activeWorkbenches.splice(idx, 1)[0]);
        }
      });
    }

    if (
      activeWorkbenches.length < keepLimit &&
      archivedWorkbenches.length > 0
    ) {
      const availableSlots = keepLimit - activeWorkbenches.length;
      if (archivedWorkbenches.length <= availableSlots) {
        // Auto-unarchive all possible
        const idsToUnarchive = archivedWorkbenches.map((w) => w._id.toString());
        finalMutations.unarchiveWorkbenchIds.push(...idsToUnarchive);
        activeWorkbenches.push(...archivedWorkbenches);
        archivedWorkbenches.length = 0;
      } else {
        if (
          !unarchiveWorkbenchIds ||
          unarchiveWorkbenchIds.length !== availableSlots
        ) {
          throw new ValidationError(
            `Select ${availableSlots} workspaces to unarchive before upgrading.`,
            {
              needsSelection: true,
              type: "UPGRADE_WORKBENCHES",
              requiredCount: availableSlots,
              archivedWorkbenches,
            },
          );
        }
        finalMutations.unarchiveWorkbenchIds.push(...unarchiveWorkbenchIds);

        unarchiveWorkbenchIds.forEach((id) => {
          const strId = id.toString();
          const idx = archivedWorkbenches.findIndex(
            (w) => w._id.toString() === strId,
          );
          if (idx !== -1) {
            activeWorkbenches.push(archivedWorkbenches.splice(idx, 1)[0]);
          }
        });
      }
    }

    if (this.#articleRepository) {
      if (articlesLimit !== -1) {
        const workbenchesNeedingArticleSelection = [];
        let totalArticlesToArchive = 0;

        for (const wb of activeWorkbenches) {
          const wId = wb._id.toString();
          const activeArticles =
            await this.#articleRepository.findActiveByWorkbenchId(wId);

          if (activeArticles.length > articlesLimit) {
            const overflow = activeArticles.length - articlesLimit;
            totalArticlesToArchive += overflow;
            workbenchesNeedingArticleSelection.push({
              workbench: wb,
              articles: activeArticles,
              keepLimit: articlesLimit,
              overflow
            });
          }
        }

        if (workbenchesNeedingArticleSelection.length > 0) {
          if (!archiveArticleIds || archiveArticleIds.length !== totalArticlesToArchive) {
            throw new ValidationError(
              "You must select which articles to archive to meet the new plan limits.",
              {
                needsSelection: true,
                type: "DOWNGRADE_ARTICLES",
                workbenches: workbenchesNeedingArticleSelection,
              }
            );
          }
          finalMutations.archiveArticleIds.push(...archiveArticleIds);
        }

        for (const wb of activeWorkbenches) {
          const wId = wb._id.toString();
          const activeArticles = await this.#articleRepository.findActiveByWorkbenchId(wId);
          if (activeArticles.length < articlesLimit) {
            const archivedArticles = await this.#articleRepository.findArchivedByWorkbenchId(wId);
            if (archivedArticles.length > 0) {
              const availableSlots = articlesLimit - activeArticles.length;
              const toUnarchive = archivedArticles.slice(0, availableSlots);
              const toUnarchiveIds = toUnarchive.map((a) => a._id.toString());
              finalMutations.unarchiveArticleIds.push(...toUnarchiveIds);
            }
          }
        }
      } else {
        for (const wb of activeWorkbenches) {
          const archivedArticles =
            await this.#articleRepository.findArchivedByWorkbenchId(
              wb._id.toString(),
            );
          if (archivedArticles.length > 0) {
            finalMutations.unarchiveArticleIds.push(
              ...archivedArticles.map((a) => a._id.toString())
            );
          }
        }
      }
    }

    if (finalMutations.archiveWorkbenchIds.length > 0) {
      await this.#workbenchRepository.archiveMany(finalMutations.archiveWorkbenchIds);
    }
    if (finalMutations.unarchiveWorkbenchIds.length > 0) {
      await this.#workbenchRepository.unarchiveMany(finalMutations.unarchiveWorkbenchIds);
    }
    if (finalMutations.archiveArticleIds.length > 0) {
      await this.#articleRepository.archiveMany(finalMutations.archiveArticleIds);
    }
    if (finalMutations.unarchiveArticleIds.length > 0) {
      await this.#articleRepository.unarchiveMany(finalMutations.unarchiveArticleIds);
    }

    let subscription;
    try {
      subscription = await this.#subscriptionRepository.findByUserId(userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return await this.#subscriptionRepository.create({
          userId,
          planId,
          status: "active",
          startedAt: new Date(),
        });
      }
      throw error;
    }

    return await this.#subscriptionRepository.update(
      subscription._id || subscription.id,
      { planId, status: "active" },
    );
  }
}
