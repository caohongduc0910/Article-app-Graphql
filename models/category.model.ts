import { Schema, model } from "mongoose"

const category = new Schema(
  {
    title: String,
    avatar: String,
    description: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
)

const Category = model("Category", category, "categories")

export default Category