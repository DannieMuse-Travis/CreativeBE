import express,{Application} from "express"
import { MainApp } from "./MainApp";
import dotenv from "dotenv"
import { db } from "./Config/DB";
dotenv.config();


const readPort = process.env.MY_PORT;
const port: number = parseInt(readPort!);

const app: Application = express();

MainApp(app);
const server = app.listen(process.env.MY_PORT || port, () => {
  db();
  console.log("Server is fine");
});

process.on("uncaughtException",(error)=>{
  console.log("server is shutting down because of uncaughtException",error);
  process.exit(1)
})

process.on("unhandledRejection",(reason)=>{
  console.log("server is shutting down becuase of unhandledRejection",reason);
  server.close(()=>{
    process.exit(1)
  })
})