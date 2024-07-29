import { Request } from "express";
import md5 from "md5";
import User from "../models/user.model";

const resolversUser = {
    Query: {
      getUser: async (_: any, args: any, context: any) => {
        const user = await User.findOne({
          token: context.user.token,
          deleted: false,
        });
        return user;
      },
    },

  Mutation: {
    register: async (_: any, args: any) => {
      const user = args.user;

      const existUser = await User.findOne({
        email: user.email,
      });

      if (existUser) {
        return {
          code: 400,
          msg: "Email đã tồn tại",
        };
      } else {
        const newUser = new User(user);
        newUser.password = md5(newUser.password);
        await newUser.save();
        return {
          code: 200,
          msg: "Đăng kí thành công",
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          token: user.token,
        };
      }
    },

    login: async (_: any, args: any) => {
      const user = args.user;
      const existUser = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (!existUser) {
        return {
          code: 400,
          msg: "Email không tồn tại",
        };
      } else {
        if (md5(user.password) != existUser.password) {
          return {
            code: 400,
            msg: "Mật khẩu không chính xác",
          };
        } else {
          return {
            code: 200,
            msg: "Đăng nhập thành công",
            id: existUser.id,
            email: existUser.email,
            fullName: existUser.fullName,
          };
        }
      }
    },
  },
};

export default resolversUser;
