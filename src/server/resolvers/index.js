import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import BaseSchema from '../../models/base-schema'
import User from '../../models/user/typedef';
import UserResolver from './user';

export const schema = makeExecutableSchema({
  typeDefs: merge([BaseSchema, User]),
  resolvers: merge([UserResolver])
});
