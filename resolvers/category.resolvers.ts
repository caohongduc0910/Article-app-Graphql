import Category from "../models/category.model";

const resolversCategory = {
  Query: {
    getListCategory: async (_: any, args: any) => {
      const { sortKey, sortValue } = args;
      const sort = {};
      if (sortKey && sortValue) {
        (sort as any)[sortKey] = sortValue;
      }
      const categories = await Category.find({
        deleted: false,
      }).sort(sort);
      return categories;
    },

    getCategory: async (_: any, args: any) => {
      const id: string = args.id;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },

  Mutation: {
    createCategory: async (_: any, args: any) => {
      const category = args.category;
      const newCategory = new Category(category);
      await newCategory.save();
      return newCategory;
    },

    deleteCategory: async (_: any, args: any) => {
      const id = args.id;
      await Category.updateOne(
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

    updateCategory: async (_: any, args: any) => {
      const { id, category } = args;

      await Category.updateOne(
        {
          _id: id,
        },
        category
      );

      const updatedCategory = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return updatedCategory;
    },
  },
};

export default resolversCategory;
