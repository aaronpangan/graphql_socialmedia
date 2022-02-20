import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.ts'));
const mutationArray = loadFilesSync(path.join(__dirname, '**/*.mutation.ts'));

export const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: [...resolversArray, ...mutationArray],
});
