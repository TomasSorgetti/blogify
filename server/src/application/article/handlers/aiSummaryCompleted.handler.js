export default class AiSummaryCompletedHandler {
  #articleRepository;

  constructor({ articleRepository }) {
    this.#articleRepository = articleRepository;
  }

  async handle(payload) {
    console.log(`[AiSummaryHandler] Summary received for article ${payload.article_id}`);
    try {
      await this.#articleRepository.updateById(payload.article_id, {
        summary: payload.summary,
      });
      console.log(`[AiSummaryHandler] Article ${payload.article_id} updated.`);
    } catch (err) {
      console.error(`[AiSummaryHandler] Failed to update article ${payload.article_id}:`, err);
    }
  }
}
