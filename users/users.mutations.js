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
    login: async (_, { userName, password }) => {
      //1. username 이 일치하는 지 확인
      // user 가 true이면 해당 userName 이 있음 , false면 없음
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "존재하지 않는 User입니다",
        };
      }
      //2. hashPassword가 일치하는지 확인
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 일치하지 않습니다",
        };
      }
      //3. 1번과 2번이 성공하면 user에게 token(user id)를 전달
    },
  },
};
