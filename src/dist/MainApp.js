"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./Router/authRouter"));
const postRouter_1 = __importDefault(require("./Router/postRouter"));
const MainApp = (app) => {
    app
        .use((0, cors_1.default)())
        .use(express_1.default.json());
    app.use("/api/v1/auth", authRouter_1.default);
    app.use("/api/v2/post", postRouter_1.default);
};
exports.MainApp = MainApp;
