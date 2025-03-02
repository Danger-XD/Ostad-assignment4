import { tokenDecode } from "../utilities/tokenUtility.js";

export default (req,res,next) =>{
    let token = req.cookies["token"];
    let decoded = tokenDecode(token);
    if(decoded === null){
        return res.status(401).json({status:"failed",message:"unauthorized"});
    }else{
        let email = decoded.email;
        let user_id = decoded.user_id;
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
}

