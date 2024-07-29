import Article from "../models/article.model";
import Category from "../models/category.model";

const resolversArticle = {
  Query: {
    getListArticle: async (_: any, args: any) => {
      const { sortKey, sortValue, index, limitItem, filterKey, filterValue, keyWord } =
        args;

      const find = {
        deleted: false,
      };

      const sort = {};
      if (sortKey && sortValue) {
        (sort as any)[sortKey] = sortValue;
      }

      if (filterKey && filterValue) {
        (find as any)[filterKey] = filterValue;
      }

      const regex = new RegExp(keyWord, "i");
      (find as any)["title"] = regex;


      const skip: number = (index - 1) * limitItem;

      const articles = await Article.find(find)
        .sort(sort)
        .limit(limitItem)
        .skip(skip);
      return articles;
    },

    getArticle: async (_: any, args: any) => {
      const id: string = args.id;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
  },

  Article: {
    category: async (article: any) => {
      const categoryID = article.categoryId;
      const category = await Category.findOne({
        _id: categoryID,
        deleted: false,
      });
      return category;
    },
  },

  Mutation: {
    createArticle: async (_: any, args: any) => {
      const article = args.article;
      const newArticle = new Article(article);
      await newArticle.save();
      return newArticle;
    },

    deleteArticle: async (_: any, args: any) => {
      const id = args.id;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "Delete Successfully";
    },

    updateArticle: async (_: any, args: any) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
        },
        article
      );

      const updatedArticle = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return updatedArticle;
    },
  },
};

export default resolversArticle;
