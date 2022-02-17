import 'dotenv/config';
import express from 'express';
import { schema } from './graphql/registerSchema';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
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

startApolloServer();
