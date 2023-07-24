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
exports.deleteOneUser = exports.ViewOneUser = exports.updateOneUser = exports.viewUser = exports.SignUpUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield authModel_1.default.create({
            email,
            password: hash,
            userName,
        });
        return res.status(201).json({
            messsage: "user created",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "unable to create user"
        });
    }
});
exports.createUser = createUser;
const SignUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const checkpassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkpassword) {
                return res.status(201).json({
                    message: "user in",
                    data: user._id,
                });
            }
            else {
                return res.status(404).json({
                    message: "user password not correct"
                });
            }
        }
        else {
            return res.status(404).json({
                messsage: "user does not stay here"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "user does not exit "
        });
    }
});
exports.SignUpUser = SignUpUser;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(200).json({
            message: "view user",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "unable to view user"
        });
    }
});
exports.viewUser = viewUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const { UserID } = req.body;
        const user = yield authModel_1.default.findByIdAndUpdate(UserID, {
            userName,
        }, { new: true });
        return res.status(201).json({
            message: "update user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to update user"
        });
    }
});
exports.updateOneUser = updateOneUser;
const ViewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(200).json({
            message: "view user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to view user",
        });
    }
});
exports.ViewOneUser = ViewOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "user deleted",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to delete user",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
