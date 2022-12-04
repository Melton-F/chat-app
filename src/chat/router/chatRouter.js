import express from "express"
import chatController from "../controller/chatController"

const router = express.Router();

router.post("/new-chat", chatController.createNewChat);

router.patch("/edit-chat/:id", chatController.updateChatById);

router.get("/show-all-chats", chatController.showAllChats);

router.post("/last-chat", chatController.lastChat);

router.get("/get-personal-chat/:connectId", chatController.showChatsByConnectId)

module.exports = router;
