import { gql } from "apollo-server-express";

const typeDefsUser = gql`
  type User {
    id: ID
    fullName: String
    email: String,
    code: Int,
    msg: String
  }

  type Query {
    getUser: User
  }

  input UserRegisterInput {
    fullName: String
    email: String 
    password: String
  }

  input UserLoginInput {
    email: String 
    password: String
  }

  type Mutation {
    register(user: UserRegisterInput): User
    login(user: UserLoginInput): User
  }
`;

export default typeDefsUser;
