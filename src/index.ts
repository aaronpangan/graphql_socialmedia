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
  server.listen(PORT, () => {
    console.log(
      `\n🚀      GraphQL is now running on http://localhost:${PORT}/`,
    );
    console.log(process.env.sss)
  });
  
}

startApolloServer();
