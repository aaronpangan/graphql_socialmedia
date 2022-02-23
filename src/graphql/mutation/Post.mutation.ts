import { ParamContext } from './../../interface/parameter.interface';
import { createPost, PostPayload } from './../../interface/post.interface';

module.exports = {
  Mutation: {
    postCreate: async (
      _,
      { title, content, isPublic }: createPost,
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
  },
};
