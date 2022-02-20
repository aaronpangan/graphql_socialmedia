import { ParamContext } from './../../interface/parameter.interface';

module.exports = {
  Mutation: {
    postCreate: async (
      _,
      { title, content, isPublic },
      { req, prisma }: ParamContext,
    ) => {},
  },
};
