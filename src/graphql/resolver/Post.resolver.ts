import { Post } from '@prisma/client';
import { throwHttpGraphQLError } from 'apollo-server-core/dist/runHttpQuery';
import { UserInputError } from 'apollo-server-express';
import { ParamContext } from '../../interface/parameter.interface';

module.exports = {
  Query: {
    getAllPost: async (_, __, { prisma }: ParamContext): Promise<Post[]> => {
      const post = await prisma.post.findMany({
        where: {
          isPublic: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return post;
    },
    getOnePost: async (_, { id }, { prisma }: ParamContext): Promise<Post> => {
      const post = await prisma.post.findFirst({
        where: {
          id,
        },
      });

      if (!post) throw new UserInputError('Invalid argument value');

      return post;
    },
    getUserPost: async (
      _,
      { userId },
      { prisma }: ParamContext,
    ): Promise<Post[]> => {
      const user = await prisma.profile.findFirst({
        where: {
          userId,
        },
      });

      if (!user) throw new UserInputError('User Not Found');

      const post = await prisma.post.findMany({
        where: {
          isPublic: true,
          profileId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return post;
    },
  },

  Post: {
    user: async (parent, args, { prisma }: ParamContext) => {
      const user = await prisma.profile.findFirst({
        where: {
          userId: parent.profileId,
        },
      });

      return user;
    },
  },
};
