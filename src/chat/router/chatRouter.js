import express from "express"
import chatController from "../controller/chatController"

const router = express.Router();

router.post("/new-chat", chatController.createNewChat);

router.patch("/edit-chat/:id", chatController.updateChatById);

router.get("/show-all-chats", chatController.showAllChats);

router.post("/chats-by-status", chatController.chatFindByStatus);

router.post("/single-chat", chatController.singleChat);

router.post("/last-chat", chatController.lastChat);

module.exports = router;
