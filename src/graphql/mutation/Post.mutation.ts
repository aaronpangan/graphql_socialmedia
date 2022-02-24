import { ParamContext } from './../../interface/parameter.interface';
import {
  CreatePost,
  PostPayload,
  CreateComment,
  CommentPayload,
} from './../../interface/post.interface';

module.exports = {
  Mutation: {
    postCreate: async (
      _,
      { title, content, isPublic }: CreatePost,
      { req, prisma }: ParamContext,
    ): Promise<PostPayload> => {
      console.log(title);
      if (!title || !content || !isPublic)
        return {
          error: [
            { message: 'You must provide a title, content and isPublic' },
          ],
          post: null,
        };

      const post = await prisma.post.create({
        data: {
          title,
          content,
          isPublic,
          profileId: 1,
        },
      });

      return { error: [], post };
    },

    commentCreate: async (
      _,
      { userId, postId, comment }: CreateComment,
      { prisma }: ParamContext,
    ): Promise<CommentPayload> => {
      const newComment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content: comment,
        },
      });

      return {
        comment: newComment
      };
    },
  },
};
