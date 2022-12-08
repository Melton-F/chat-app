import express from "express";
import {createUserByFileUpload, createUser, getUserById, lastChatOfUser, updateProfilePic, greetings} from "../controller/user-controller";
import upload from "../../middleware/multer";

const router = express.Router();

router.get("/", greetings);

// router.post("/create-user",upload.single("profile"), createUser); // using multer file upload
router.post("/create-user-fileUpload", createUserByFileUpload);

router.post("/create-user", createUser);

router.get("/get-user/:id", getUserById);

router.post("/last-chat", lastChatOfUser);

router.patch("/change-profile-picture", updateProfilePic)

module.exports = router;
