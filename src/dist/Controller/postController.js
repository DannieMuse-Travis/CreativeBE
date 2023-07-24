"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnesong = exports.UpdateOneSong = exports.viewOneSong = exports.viewSongs = exports.writeSong = void 0;
const postModel_1 = __importDefault(require("../Model/postModel"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const writeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authID } = req.body;
        const { title, content } = req.body;
        const post = yield authModel_1.default.findById(authID);
        const user = yield postModel_1.default.create({
            title,
            content,
        });
        (_a = post === null || post === void 0 ? void 0 : post.user) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(user._id));
        post === null || post === void 0 ? void 0 : post.save();
        return res.status(201).json({
            messsage: "song created",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "unable to write song"
        });
    }
});
exports.writeSong = writeSong;
const viewSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postModel_1.default.find();
        return res.status(200).json({
            message: "view song",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "unable to write song"
        });
    }
});
exports.viewSongs = viewSongs;
const viewOneSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songID } = req.params;
        const post = yield postModel_1.default.findById(songID);
        return res.status(200).json({
            message: "read Post",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.viewOneSong = viewOneSong;
const UpdateOneSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { songID } = req.params;
        const post = yield postModel_1.default.findByIdAndUpdate(songID, { title, content }, { new: true });
        return res.status(201).json({
            message: "song updated",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.UpdateOneSong = UpdateOneSong;
const deleteOnesong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songID } = req.params;
        const post = yield postModel_1.default.findByIdAndDelete(songID);
        return res.status(201).json({
            message: "song delete",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.deleteOnesong = deleteOnesong;
