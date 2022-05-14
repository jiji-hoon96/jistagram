import {protectedResolver} from '../../users/users.utils'
export default {
    Mutation : {
        uploadPhoto: protectedResolver(async (_, {file,caption}, {loggedInUser})=>{
            if(caption){
                //해쉬테그가 있거나 , 만들거면 여기서 작업
                const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
                console.log(hashtags)
            }
            //그 후에 저장
        }
        )
    }
}