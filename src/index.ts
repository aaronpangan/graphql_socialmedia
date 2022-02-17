import express from 'express';
import 'dotenv/config';
import { schema } from './graphql/registerSchema';
import { ApolloServer } from 'apollo-server-express';

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    schema,
    introspection: true,
   
  });

  await server.start();

  app.get('/', (req, res) => res.send({ Meow: 'Meow' }));

  server.applyMiddleware({ app, path: '/graphql' });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`,
    );
  });
}

startApolloServer();
