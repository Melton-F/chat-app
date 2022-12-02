import express from "express";
import userController from "../controller/userController";
import upload from "../../middleware/multer";

const router = express.Router();

router.get("/", userController.greetings);

router.get(
  "/show-users",
  upload.single("profile_picture"),
  userController.showAllUsers
);

router.post("/create-user", userController.createUser);

router.get("/get-user/:id", userController.getUserById);

router.post("/last-chat", userController.lastChatOfUser);

module.exports = router;
