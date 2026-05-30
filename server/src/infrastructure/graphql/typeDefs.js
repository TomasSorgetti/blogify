export const typeDefs = `#graphql
  type Category {
    _id: ID!
    name: String!
    slug: String!
  }

  type Author {
    _id: ID!
    name: String!
    avatar: String
  }

  type Article {
    _id: ID!
    title: String!
    slug: String!
    content: String!
    summary: String!
    status: String!
    tags: String
    coverImage: String
    imageUrl: String
    isFeatured: Boolean
    isGlobal: Boolean
    views: Int
    author: Author
    categories: [Category]
    createdAt: String
    updatedAt: String
  }

  type ArticleConnection {
    items: [Article]
    total: Int
    page: Int
    pages: Int
  }

  type Query {
    articles(
      status: String
      tags: String
      isFeatured: Boolean
      page: Int
      limit: Int
    ): ArticleConnection

    article(slug: String!): Article
  }
`;
