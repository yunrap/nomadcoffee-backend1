import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String!
    password: String!
    bio: String
    avatarURL: String
    githubUsername: String!
  }
`;
