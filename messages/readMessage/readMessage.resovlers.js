import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation: {
        readMessage: protectedResolver(async(_, {id}, {loggedInUser})=>{
            const message = await client.message.findFirst({
                where:{
                    id,
                    userId: {
                        not: loggedInUser.id,
                    },
                    room:{
                        users:{
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                },
                select:{
                    id:true,
                }
            })
            if(!message){
                return{
                    ok: false,
                    error: "메세지를 찾을 수 없습니다",
                }
            }
            await client.message.update({
                where:{
                    id,
                },
                data:{
                    read: true,
                }
            });
            return{
                ok:true,
            }
        })
    }
}