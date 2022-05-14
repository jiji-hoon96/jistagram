import { gql } from "apollo-server";

export default gql`
    type Photo {
        id: String!
        user: String!
        createdAt: String!
        file : String!
        updatedAt: String!
        userId: String!
        caption : String
        hashtags : [Hashtag]
    }
    type Hashtag {
        id: String!
        Hashtag : String!
        photos:  [Photo]
        createdAt: String!
        updatedAt :String!
    }
`