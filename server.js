require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
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

server
  .listen(PORT)
  .then(() => console.log(`Server is running  http://localhost:${PORT}/"`));
