import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation: {
        deletePhoto: protectedResolver(async(_,{id},{loggedInUser})=>{
            const photo = await client.photo.findUnique({
                where: {
                    id,
                },
                select: {
                    userId : true,
                },
            });
            if(!photo){
                return {
                    ok: false,
                    error: "사진이 없습니다"
                };
            }else if(photo.userId !== loggedInUser.id){
                return {
                    ok: false,
                    error: "Not authorized",
                };
            }else{
                await client.photo.delete({
                    where: {
                        id,
                    }
                });
                return {
                    ok: true,
                }
            }
        }
        )
    }
}