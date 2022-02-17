import express from 'express';
import 'dotenv/config';
import { schema } from './graphql/registerSchema';
import { ApolloServer } from 'apollo-server-express';

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({ schema });

  await server.start();

  app.get('/', (req, res) => res.send({ Meow: 'Meow' }));

  server.applyMiddleware({ app, path: '/graphiql' });
  app.listen(process.env.port || 5000, () => {
    console.log(
      `\n🚀      GraphQL is now running on http://localhost:${PORT}/graphiql`,
    );
  });
}

startApolloServer();
