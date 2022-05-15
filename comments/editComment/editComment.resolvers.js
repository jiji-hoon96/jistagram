import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation: {
        editComment: protectedResolver(async(_,{id,payload},{loggedInUser}) => {
            const comment = await client.comment.findUnique({
                where:{
                    id,
                },
                select:{
                    userId:true
                }
            });
            if(!comment){
                return{
                    ok: false,
                    error: "Comment를 찾을 수 없습니다"
                }
            } else if(comment.userId !== loggedInUser.id){
                return{
                    ok: false,
                    error: "Not autorized",
                }
            }else{
                await client.comment.update({
                    where:{
                        id,
                    },
                    data: {
                        payload,
                    }
                });
                return {
                    ok: true,
                }
            }
        })
    }
}