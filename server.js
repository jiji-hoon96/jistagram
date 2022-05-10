import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("서버가 http://localhost:4000/ 에서 작동중입니다"));
