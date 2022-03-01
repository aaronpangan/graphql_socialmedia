import { IParamContext } from './../../interface/parameter.interface';
import { UserInputError } from 'apollo-server-express';
import {
  ICreatePost,
  IPostPayload,
  ICreateComment,
  ICommentPayload,
  IUpdatePost,
  IAddPostImage,
} from './../../interface/post.interface';
import { PostImage } from '@prisma/client';

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
    postAddImage: async (
      _,
      { postId, url }: IAddPostImage,
      { prisma }: IParamContext,
    ): Promise<PostImage[]> => {
      const findPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      if (!findPost) throw new UserInputError('Post Not Found');

      const parseUrlObject = JSON.parse(JSON.stringify(url));
      parseUrlObject.forEach((object) => {
        object.postId = Number(postId);
      });

      await prisma.postImage.createMany({
        data: parseUrlObject,
      });

      const images = await prisma.postImage.findMany({
        where: { postId: Number(postId) },
      });

      console.log(images);

      return images;
    },
    commentCreate: async (
      _,
      { userId, postId, comment }: ICreateComment,
      { prisma }: IParamContext,
    ): Promise<ICommentPayload> => {
      const newComment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content: comment,
        },
      });

      return {
        comment: newComment,
      };
    },
  },
};
