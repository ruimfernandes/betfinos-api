import User from '../../../models/user';

export default {
  Query: {
    user: (parent, args) => User.findById(args.id),
    users: (parent, args) => User.find({}),
  },
  Mutation: {
    addUser: (parent, args) => User.create(args),
    deleteUser: (parent, args) => User.removeById(args.id),
    updateUser: (parent, args) => User.updateById(args),
  },
};
