import express, { Express } from "express";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";

import databaseConnection from "./database/db.config";
import typeDefs from "./typeDefs/index.typeDefs";
import resolvers from "./resolvers/index.resolvers";
import authMiddleware from "./middlewares/auth.middlewares";

const startServer = async () => {
  const app: Express = express();
  dotenv.config();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  databaseConnection();

  app.use("/graphql", authMiddleware);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
      return { ...req };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  const port: string | number = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startServer();
