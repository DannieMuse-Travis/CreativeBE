import express,{Router} from "express"
import { UpdateOneSong, deleteOnesong, viewOneSong, viewSongs, writeSong } from "../Controller/postController";


const router:Router = express.Router();

router.route("/writeSong").post(writeSong)
router.route("/view").get(viewSongs)
router.route("/users").get()
router.route("/:songID/viewed").get(viewOneSong)
router.route("/:songID/update").patch(UpdateOneSong)
router.route("/:songID/delete").delete(deleteOnesong)

export default router