import { ARTICLE_PATTERNS } from "../../domain/constants/ai-patterns.js";
import { UseCaseContract } from "../../domain/contracts/application/usecase.contract.js";
export default class GenerateAiArticleUseCase extends UseCaseContract {
  #aiClient;

  constructor({ aiClient }) {
    super();
    this.#aiClient = aiClient;
  }

  async execute({ prompt, tone }) {
    try {
      const { text } = await this.#aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          ${ARTICLE_PATTERNS.IDENTITY}
          
          LANGUAGE: English (unless the prompt is clearly in another language).
          TONE: Strictly maintain a ${tone} tone.
          
          CONTENT GUIDELINES:
          ${ARTICLE_PATTERNS.SEO}
          ${ARTICLE_PATTERNS.UX_WRITING}
          ${ARTICLE_PATTERNS.HUMAN_TOUCH}

          TASK: Generate a high-quality article about: "${prompt}"

          STRICT CONSTRAINTS (MANDATORY):
          - title: Must be between 10 and 100 characters.
          - summary: Must be a short overview. STRICT MAXIMUM of 450 characters (to stay safe under 500 limit).
          - content: Long-form article in Markdown. Minimum 500 characters.
          - tags: Array of 3-5 keywords.
          - categories: Array of 1-2 relevant category names.
          - metaTitle: 50-60 characters SEO title.
          - metaDescription: 120-160 characters SEO description.

          IMPORTANT: Return ONLY a valid JSON object. 
          CRITICAL: All newline characters within the "content" or "summary" fields MUST be escaped as "\\n". 
          Do not include markdown code blocks.
        `,
        generationConfig: {
          response_mime_type: "application/json",
        },
      });

      console.log("RAW_TEXT_RECEIVED");

      let extracted = text.trim();

      if (extracted.includes("```")) {
        const matches = extracted.match(/```(?:json)?([\s\S]*?)```/);
        if (matches) extracted = matches[1].trim();
      }

      const jsonStart = extracted.indexOf("{");
      const jsonEnd = extracted.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");

      let finalJson = extracted.substring(jsonStart, jsonEnd + 1);

      const object = JSON.parse(finalJson);

      return {
        title: object.title,
        summary: object.summary,
        content: object.content,
        tags: object.tags.join(", "),
        categories: [],
        newCategories: object.categories,
        metaTitle: object.metaTitle,
        metaDescription: object.metaDescription,
        status: "draft",
        workbench: "ai-generated",
      };
    } catch (error) {
      throw new Error(
        "AI generation failed. Please verify your API Key and model access.",
      );
    }
  }
}
