import md5 from "md5";
import studentModel from "../models/studentModels.js";
import { tokenEncode } from "../utilities/tokenUtility.js";
import { COOKIE_MAX_TIME, COOKIE_SECURITY, HTTP_ONLY_OPTION, SAME_SITE_OPTION } from "../configs/configs.js";

export const createProfileService = async (req) =>{
    try {
        let roll = req.body["roll"];
        let password = md5(req.body["password"]);
        let reqBody = req.body;
        reqBody["password"] = password;
        // console.log(password);
        let data = await studentModel.find({roll:roll});
        if(data.length == 0){
            await studentModel.create(reqBody);
            return {status:"success", message:"Profile created successfully"};
        }else{
            return {status:"failed", message:"Profile already exists"};
        }
    } catch (error) {
        return {status:"failed", message: error.toString()};
    }
}
export const loginService = async (req,res) =>{
    try {
        let password= req.body.password;
        let reqBody = req.body;
        reqBody.password = md5(password);
        // console.log(reqBody.password);
        let matchStage = {$match:reqBody};
        let project = {$project:{email:1,_id:1}};
        let data = await studentModel.aggregate([
            matchStage,
            project
        ]);
        // console.log(data);
        if(data.length == 0){
            return {status:"failed", message:"No user found"};
        }else{
            let token = tokenEncode(data[0]["email"],data[0]["_id"]);
            let options ={
                maxAge: COOKIE_MAX_TIME,
                httpOnly: HTTP_ONLY_OPTION,
                sameSite: SAME_SITE_OPTION,
                secure: COOKIE_SECURITY
            };
            res.cookie("token",token,options);
            return {status:"success", message:"Login successful", data:data[0],token:token};
        }
    } catch (error) {
        return {status:"failed", message: error.toString()};
    }
}
export const logoutService = async (req,res) =>{
    try {
        res.clearCookie("token");
        return {status:"success",message:"Logout successful"};
    } catch (error) {
        return {status:"failed", message: error.toString()};
    }
}
export const viewProfileService = async (req) =>{
    try {
        let email = req.headers.email;       
        let matchStage = {$match:{email:email}};
        let project = {$project:{_id:0,name:1,age:1,roll:1,grade:1,email:1}};
        let data = await studentModel.aggregate([
            matchStage,
            project
        ]);
        return {status:"success",data:data};
    } catch (error) {
        return {status:"failed", message: error.toString()};
    }
}
export const updateProfileService = async (req) =>{
    try {
        let email = req.headers.email;       
        let reqBody = req.body;
        let data = await studentModel.updateOne({email:email},reqBody);
        return {status:"success",message:"Profile updated successfully",data:data};
    } catch (error) {
        return {status:"failed", message: error.toString()};
    }
}