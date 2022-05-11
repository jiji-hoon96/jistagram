import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        //1. 동일한 userName, emial이  DB 에 있는지
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("이미 존재하는 userName/email 입니다");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: hashPassword,
          },
        });
        //2. 없으면 비번 hash해서 계정생성 / 있으면 return
      } catch (errormessage) {
        return errormessage;
      }
    },
  },
};
