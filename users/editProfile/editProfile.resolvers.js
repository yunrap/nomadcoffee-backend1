import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { makeInstaller } from "install";

const resolverFn = async (
  _,
  {
    username,
    email,
    name,
    location,
    password: newPassword,
    bio,
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
      bio,
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
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
