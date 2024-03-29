import { gql } from "apollo-server";

export default gql`

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      bio: String
      password: String
      avatar: Upload
    ): MutationResponse!
  }
`;
