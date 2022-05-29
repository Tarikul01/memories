import {decode} from 'jsonwebtoken';

// want to like a post
// click the like button =>auth middleware(next)
// like controller 

const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;
        let decodeData;
        if(token && isCustomAuth){
            decodeData=decode(token);
            req.userId=decodeData?.id;
        }else{
            decodeData=decode(token);
            req.userId=decodeData?.sub;
        }



        next()
    } catch (err) {
        console.log(err)
        
    }
}

export default auth;