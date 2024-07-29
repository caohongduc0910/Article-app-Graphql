import { Schema, model } from "mongoose"
import generateRandomString from "../helpers/tokenGenerate.helpers"

const userSchema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generateRandomString(30)
    },
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

const User = model("User", userSchema, "users")

export default User