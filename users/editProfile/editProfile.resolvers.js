import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstname, lastName, userName, email, password: newPassword }
    ) => {
      let passwordHash = null; // const로 하면 read-only가 된다
      if (newPassword) {
        passwordHash = await bcrypt.hash(newPassword, 10);
      }
      const updateUser = await client.user.update({
        where: {
          id: 4,
        },
        data: {
          firstname,
          lastName,
          userName,
          email,
          ...(passwordHash && { password: passwordHash }),
        },
      });
      if (updateUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "프로필을 수정할 수 없습니다",
        };
      }
    },
  },
};
