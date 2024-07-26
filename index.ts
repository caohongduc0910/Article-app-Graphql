import express, { Express } from "express";
import dotenv from "dotenv";
import databaseConnection from "./database/db.config";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const startServer = async () => {
  const app: Express = express();
  dotenv.config();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  databaseConnection();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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

startServer()
