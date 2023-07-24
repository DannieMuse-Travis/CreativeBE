"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../Controller/postController");
const router = express_1.default.Router();
router.route("/writeSong").post(postController_1.writeSong);
router.route("/view").get(postController_1.viewSongs);
router.route("/users").get();
router.route("/:songID/viewed").get(postController_1.viewOneSong);
router.route("/:songID/update").patch(postController_1.UpdateOneSong);
router.route("/:songID/delete").delete(postController_1.deleteOnesong);
exports.default = router;
