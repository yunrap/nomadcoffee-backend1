import client from "../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      // check if username or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      const uglyPassword = await bcrypt.hash(password, 10);
      console.log(uglyPassword);
      return client.user.create({
        data: {
          username,
          email,
          name,
          location,
          password: uglyPassword,
          avatarURL,
          githubUsername,
        },
      });
      // hash password
      // save and return the user
    },
  },
};
