import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This userName/password is already taken.");
        }
        const passwordHast = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: passwordHast,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
