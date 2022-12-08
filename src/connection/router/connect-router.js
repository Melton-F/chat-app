import express from "express"
import {createChatConnection, chatConnections, userChats} from "../controller/connect-controller"

const router = express.Router()

router.post('/create-connect', createChatConnection)

router.get('/show-connections', chatConnections)

router.get('/user-chats/', userChats)

module.exports = router;