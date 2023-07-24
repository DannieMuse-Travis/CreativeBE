import express,{Application} from "express"
import cors from "cors"
import auth from "./Router/authRouter"
import post from "./Router/postRouter"

export const MainApp= (app:Application)=>{
    app
    .use(cors())
    .use(express.json())
    app.use("/api/v1/auth", auth)
    app.use("/api/v2/post",post)
}