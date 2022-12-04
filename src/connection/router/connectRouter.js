import express from "express"
import connectController from "../controller/connectController"

const router = express.Router()

router.post('/create-connect', connectController.createChatConnection)

router.get('/show-connections', connectController.chatConnections)

router.get('/user-chats/:userId', connectController.userChats)

module.exports = router;