import express from "express";
import userController from "../controller/userController";
import upload from "../../middleware/multer";

const router = express.Router();

router.get("/", userController.greetings);

router.post("/create-user",upload.single("profile"), userController.createUser);

router.get("/get-user/:id", userController.getUserById);

router.post("/last-chat", userController.lastChatOfUser);

module.exports = router;
