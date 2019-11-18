import User from '../../../models/user';
import PubSub from '../pub-sub';

const USER_ADDED_TOPIC = 'userAdded';

export default {
  Query: {
    user: (parent, args) => User.findById(args.id),
    users: (parent, args) => User.find({})
  },
  Mutation: {
    addUser: (parent, args) =>
      User.create(args).then(user => {
        PubSub.publish(USER_ADDED_TOPIC, { [USER_ADDED_TOPIC]: user });
        return user;
      }),
    deleteUser: (parent, args) => User.removeById(args.id),
    updateUser: (parent, args) => User.updateById(args)
  },
  Subscription: {
    userAdded: {
      subscribe: () => PubSub.asyncIterator(USER_ADDED_TOPIC)
    }
  }
};
