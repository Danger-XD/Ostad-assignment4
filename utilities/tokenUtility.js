import { JWT_EXPIRY_TIME, JWT_KEY } from "../configs/configs.js";
import jwt from "jsonwebtoken";

export const tokenEncode = (email,id) =>{
    const KEY = JWT_KEY;
    const EXPIRE_TIME = {expiresIn:JWT_EXPIRY_TIME};
    const PAYLOAD = {email: email, user_id:id};
    return jwt.sign(PAYLOAD,KEY,EXPIRE_TIME);
}
export const tokenDecode = (token) =>{
    try{
        const KEY = JWT_KEY;
        return jwt.verify(token,KEY);
    }catch(error){
        return null;
    }
}