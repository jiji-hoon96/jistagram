import client from '../../client';
import {protectedResolver} from '../../users/users.utils'
export default {
    Mutation : {
        uploadPhoto: protectedResolver(async (_, {file,caption}, {loggedInUser})=>{
            let hashtagObj =[];
            if(caption){
                //해쉬테그가 있거나 , 만들거면 여기서 작업
                const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
                hashtagObj = hashtags.map(hashtag => ({where: {hashtag}, create: {hashtag}}))
            }
            return client.photo.create({
                data:{
                    file,
                    caption,
                    user: {
                        connect:{
                            id:loggedInUser.id
                        }
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtags:{
                            connectOrCreate: hashtagObj
                        }
                    })
                }
            })
            //그 후에 저장
        }
        )
    }
}