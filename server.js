require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    console.log(
      req.headers.authorization + "+++++++header token authorization"
    );
    return {
      loggedInUser: await getUser(req.headers.authorization),
    };
  },
});

const PORT = process.env.PORT;

// app.use(graphqlUploadExpress());
// app.use(logger("tiny"));
// server.applyMiddleware({ app });
// app.use("/static", express.static("uploads"));

server
  .listen(PORT)
  .then(() => console.log(`Server is running  http://localhost:${PORT}/`));
