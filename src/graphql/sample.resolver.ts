import { PrismaClient } from '@prisma/client';
const { sample } = new PrismaClient();

module.exports = {
  Query: {
    hello: () => {
      console.log('meow');
      return 'asds';
    },
  },

  Mutation: {
    sample: async (_, args) => {
     let newSample = await sample.create({
        data: {
          name: args.id,
        },
      });

      console.log(newSample)
      return args.id;
      
    },
  },

  Xa: {
    prod: () => {
      console.log('MEow');
    },
  },
};
