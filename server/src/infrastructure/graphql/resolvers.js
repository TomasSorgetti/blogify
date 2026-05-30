export const resolvers = {
  Query: {
    articles: async (_, { status, tags, isFeatured, page, limit }, { getArticlesUseCase, user }) => {
      // Enforce workbench if via API Key
      const workbenchId = user?.viaApiKey && user.workbenchId ? user.workbenchId : null;

      const result = await getArticlesUseCase.execute(
        { status, tags, isFeatured },
        workbenchId,
        { page: page || 1, limit: limit || 10 }
      );

      return result;
    },

    article: async (_, { slug }, { getArticleUseCase, user }) => {
      const isAdmin = user?.role === "admin";
      return await getArticleUseCase.execute({ slug, isAdmin });
    },
  },
};
