import express,{Router} from "express"
import { SignUpUser, ViewOneUser, createUser, deleteOneUser, updateOneUser, viewUser } from "../Controller/authController";

const router:Router = express.Router();

router.route("/sign-in").post(SignUpUser)
router.route("/register").post(createUser)
router.route("/users").get(viewUser)
router.route("/:userID/user-detail").get(ViewOneUser)
router.route("/:userID/update-user").patch(updateOneUser)
router.route("/:userID/delete-user").delete(deleteOneUser)

export default router