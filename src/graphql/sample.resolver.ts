import { PrismaClient } from '@prisma/client';
const { user } = new PrismaClient();

module.exports = {
  Query: {
    hello: () => {
      console.log('meow');
      return 'asds';
    },
  },

  Mutation: {
    sample: async (_, args) => {
      let newSample = await user.create({
        data: {
          email: 'Sample@email.com',
          password: args.id,
        },
      });
      console.log(newSample);
      return args.id;
    },
  },

  Xa: {
    prod: () => {
      console.log('MEow');
    },
  },
};
