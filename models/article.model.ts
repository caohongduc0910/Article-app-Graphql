import { Schema, model } from "mongoose"

const article = new Schema(
  {
    title: String,
    avatar: String,
    description: String,
    dob: String,
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

const Article = model("Article", article, "articles")

export default Article