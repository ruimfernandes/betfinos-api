import { schema } from './resolvers';
import { ApolloServer } from 'apollo-server-express';

export default new ApolloServer({
  schema
});
