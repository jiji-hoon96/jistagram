require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema.js";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() =>
    console.log(`서버가 http://localhost:${PORT}/ 에서 작동중입니다`)
  );
