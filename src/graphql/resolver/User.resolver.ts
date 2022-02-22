import { Profile, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { ParamContext } from './../../interface/parameter.interface';
import { UserInputError } from 'apollo-server-express';
module.exports = {
  Query: {},

  Profile: {
    user: async (
      parent: Profile,
      _,
      { prisma }: ParamContext,
    ): Promise<User> => {
      const user = await prisma.user.findFirst({
        where: {
          id: parent.userId,
        },
      });

      if (!user) throw new UserInputError('User Not Found');

      return user;
    },
  },
};
