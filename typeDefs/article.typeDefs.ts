import { gql } from "apollo-server-express";

const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }

  type Query {
    getListArticle(
      sortKey: String
      sortValue: String
      index: Int = 1
      limitItem: Int = 2
      filterKey: String
      filterValue: String
      keyWord: String
    ): [Article]
    getArticle(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;

export default typeDefsArticle;
