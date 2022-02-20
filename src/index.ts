import 'dotenv/config';
import express from 'express';
import middleware from './middleware/authMiddleware';
import { schema } from './graphql/registerSchema';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';

async function startServer() {
  const prisma = new PrismaClient();
  const app = express();
  middleware(app);
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ req, res, prisma }),
  });

  await server.start();

  server.applyMiddleware({ app, path: '/' });
  const PORT = process.env.PORT || 5000;
  const env = process.env.NODE_ENV;
  app.listen(PORT, () => {
    if (env === 'development')
      console.log(
        `\n🚀      GraphQL is now running on http://localhost:${PORT}/`,
      );
    else if (env === 'production')
      console.log(
        `\n🚀      GraphQL is now running on https://graphql-socialmedia-prisma.herokuapp.com/`,
      );
  });
}

startServer();
