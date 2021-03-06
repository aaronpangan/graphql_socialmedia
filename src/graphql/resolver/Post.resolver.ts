import { Comment, Post, PostImage, Profile } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { IParamContext } from '../../interface/parameter.interface';

module.exports = {
  Query: {
    getAllPost: async (_, __, { prisma }: IParamContext): Promise<Post[]> => {
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
    getOnePost: async (_, { id }, { prisma }: IParamContext): Promise<Post> => {
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
      { prisma }: IParamContext,
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
    profile: async (
      parent,
      args,
      { prisma }: IParamContext,
    ): Promise<Profile | null> => {
      const user = await prisma.profile.findFirst({
        where: {
          userId: parent.profileId,
        },
      });

      return user;
    },

    images: async (
      parent: Post,
      __,
      { prisma }: IParamContext,
    ): Promise<PostImage[]> => {
      const postPicture = await prisma.postImage.findMany({
        where: {
          postId: parent.id,
        },
      });
      return postPicture;
    },

    comments: async (
      parent: Post,
      __,
      { prisma }: IParamContext,
    ): Promise<Comment[] | null> => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parent.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return comments;
    },
  },

  Comment: {
    user: async (
      parent: Comment,
      __,
      { prisma }: IParamContext,
    ): Promise<Profile | null> => {
      const user = await prisma.profile.findFirst({
        where: {
          userId: parent.userId,
        },
      });

      return user;
    },
  },
};
