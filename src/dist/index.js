"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MainApp_1 = require("./MainApp");
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = require("./Config/DB");
dotenv_1.default.config();
const readPort = process.env.MY_PORT;
const port = parseInt(readPort);
const app = (0, express_1.default)();
(0, MainApp_1.MainApp)(app);
const server = app.listen(process.env.MY_PORT || port, () => {
    (0, DB_1.db)();
    console.log("Server is fine");
});
process.on("uncaughtException", (error) => {
    console.log("server is shutting down because of uncaughtException", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("server is shutting down becuase of unhandledRejection", reason);
    server.close(() => {
        process.exit(1);
    });
});
