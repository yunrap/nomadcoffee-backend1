import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      // check password with args.password
      const token = await jwt.sign(
        { id: user.id, potato },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};