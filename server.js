require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import http from 'http';
import pubsub from "./pubsub";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    if(req){
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Connected!')
    },
    onDisconnect: (webSocket, context) => {
      console.log('Disconnected!')
    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer)
httpServer.listen( PORT , () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});