import express from "express"
import {createNewChat, updateChatById, showAllChats, showChatsByConnectId} from "../controller/chat-controller"

const router = express.Router();

router.post("/new-chat", createNewChat);

router.patch("/edit-chat/:id", updateChatById);

router.get("/show-all-chats", showAllChats);

router.get("/get-personal-chat/:connectId", showChatsByConnectId)

module.exports = router;
