import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      //1. 동일한 username, emial이  DB 에 있는지
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      console.log(existingUser);
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      //2. 없으면 비번 hash해서 계정생성 / 있으면 return
    },
  },
};
