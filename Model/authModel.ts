import mongoose from "mongoose";

export interface iAuth{
    userName?:string;
    email?:string;
    password?:string;
}

interface iAuthData extends iAuth,mongoose.Document{}

const authModel = new mongoose.Schema(
{
    userName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
   
},
{timestamps:true}
)

export default mongoose.model<iAuthData>("users",authModel)