import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  extend type Query {
    users: [User]
    user(id: ID!): User
  }
  extend type Mutation {
    addUser(
      name: String!
      age: Int!
    ): User
    deleteUser(id: ID!): User
    updateUser(
      id: ID!
      name: String
      age: Int
    ): User
  }
  extend type Subscription {
    userAdded: User
  }
`;
