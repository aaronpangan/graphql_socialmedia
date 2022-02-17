module.exports = {
  Query: {
    hello: () => {
      console.log('meow');
      return 'asds';
    },
  },

  Mutation: {
    sample: (_, args) => {
      console.log(args);
      return args.id;
    },
  },

  Xa: {
    prod: () => {
      console.log('MEow');
    },
  },
};
