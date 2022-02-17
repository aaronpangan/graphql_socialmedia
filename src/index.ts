import 'dotenv/config';
import { schema } from './graphql/registerSchema';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const PORT = process.env.PORT || 5000;
  const env = process.env.NODE_ENV;
  server.listen(PORT, () => {
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
