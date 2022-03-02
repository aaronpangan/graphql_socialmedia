import { IParamContext } from './../../interface/parameter.interface';
import { UserInputError } from 'apollo-server-express';
import {
  ICreatePost,
  IPostPayload,
  IComment,
  ICommentPayload,
  IUpdatePost,
  IPostImage,
  IDeletePost,
} from './../../interface/post.interface';
import { Comment, PostImage } from '@prisma/client';
import { parseArrObj } from '../../helper/helper';
import { printSchema } from 'graphql';

module.exports = {
  Mutation: {
    postCreate: async (
      _,
      { post: { title, content, isPublic } }: ICreatePost,
      { req, prisma }: IParamContext,
    ): Promise<IPostPayload> => {
      console.log(title);
      if (!title || !content || !isPublic)
        throw new UserInputError('Must include title, content and isPublic');

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          isPublic,
          profileId: 1,
        },
      });

      return { newPost };
    },

    postUpdate: async (
      _,
      { post: { title, content, isPublic }, postId }: IUpdatePost,
      { prisma }: IParamContext,
    ) => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const updatePost = await prisma.post.update({
        data: {
          title: !title ? findPost.title : title,
          content: !content ? findPost.content : content,
          isPublic: !isPublic ? findPost.isPublic : isPublic,
        },
        where: {
          id: Number(postId),
        },
      });

      return updatePost;
    },
    postDelete: async (
      _,
      { postId }: IDeletePost,
      { prisma }: IParamContext,
    ) => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const deletePost = await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      });

      return 'Post Deleted Successfully';
    },
    postAddImage: async (
      _,
      { postId, url }: IPostImage,
      { prisma }: IParamContext,
    ): Promise<PostImage[]> => {
      const parseUrlObject = parseArrObj(url, postId);

      await prisma.postImage.createMany({
        data: parseUrlObject,
      });

      const images = await prisma.postImage.findMany({
        where: { postId: Number(postId) },
      });

      return images;
    },
    postDeleteImage: async (
      _,
      { postId, imageId }: IPostImage,
      { prisma }: IParamContext,
    ): Promise<string> => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const deleteImage = await prisma.postImage.deleteMany({
        where: {
          id: { in: imageId },
          postId: Number(postId),
        },
      });

      return `Successfully deleted images`;
    },
    commentCreate: async (
      _,
      { userId, postId, comment }: IComment,
      { prisma }: IParamContext,
    ): Promise<ICommentPayload> => {
      const newComment = await prisma.comment.create({
        data: {
          postId: Number(postId),
          userId: Number(userId),
          content: comment,
        },
      });
      return newComment;
    },

    commentUpdate: async (
      _,
      { postId, commentId, comment }: IComment,
      { prisma }: IParamContext,
    ): Promise<Comment> => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const findComment = await prisma.comment.findUnique({
        where: {
          id: Number(commentId),
        },
      });

      if (!findComment) throw new UserInputError('Comment Not Found');

      const updateComment = await prisma.comment.update({
        data: { content: comment },
        where: {
          id: Number(commentId),
        },
      });

      return updateComment;
    },

    commentDelete: async (
      _,
      { postId, commentId }: IComment,
      { prisma }: IParamContext,
    ): Promise<string> => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const findComment = await prisma.comment.findUnique({
        where: {
          id: Number(commentId),
        },
      });

      if (!findComment) throw new UserInputError('Comment Not Found');

      const deletePost = await prisma.comment.delete({
        where: {
          id: Number(commentId),
        },
      });

      return 'Deleted Successfully';
    },
  },
};
