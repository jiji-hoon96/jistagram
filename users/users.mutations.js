import client from "../client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      //1. 동일한 username, emial이  DB 에 있는지
      const existingUser = await client.user.findfirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      //2. 없으면 비번 hash해서 계정생성 / 있으면 return
    },
  },
};
