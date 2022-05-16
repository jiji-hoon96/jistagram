import { gql } from "apollo-server";
export default gql`
    type Message{
        id: Int!
        createdAt: String!
        updateAt: String!
        payload: String!
        user: User!
        room: Room!
    }
    type Room{
        id: Int!
        unreadTotal: Int!
        createdAt: String!
        updateAt: String!
        users: [User]
        messages: [Message]
    }
`