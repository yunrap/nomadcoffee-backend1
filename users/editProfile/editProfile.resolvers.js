import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      {
        username,
        email,
        name,
        location,
        password: newPassword,
        avatarURL,
        githubUsername,
      },
      { loggedInUser }
    ) => {
      console.log(loggedInUser + "loggedInUser");
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          username,
          email,
          name,
          location,
          ...(uglyPassword && { password: uglyPassword }),
          avatarURL,
          githubUsername,
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "could not update profile",
        };
      }
    },
  },
};
