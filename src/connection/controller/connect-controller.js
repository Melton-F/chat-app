import Connect from "../model/connect-model";
import Chat from "../../chat/model/chat-model";
import mongoose from "mongoose";

export const createChatConnection = async (req, res) => {
  try {
    const chatConnection = await new Connect({
      _id: mongoose.Types.ObjectId(),
      person1: req.body.person1,
      person2: req.body.person2,
    });
    chatConnection.save();

    res.status(201).json({
      chat_connect: chatConnection,
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const chatConnections = async (req, res) => {
  try {
    const chats = await Connect.find();
    res.status(200).json({
      no_of_chat_friends: chats.length,
      friends_in_chat: chats,
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const userChats = async (req, res) => {
  try {
    const connectionByBothPersons = await Connect.find({
      $or: [{ person1: req.body.userId }, { person2: req.body.userId }],
    });

    let result = [];
    connectionByBothPersons.forEach(async (element, index, array) => {
      let chatsByConnection = await Chat.find({ connect: element._id });
      let lastIndex = chatsByConnection.length - 1;
      let resultObj = chatsByConnection[lastIndex];
      result.push(resultObj);
      if (index === array.length - 1) {
        res.status(200).json({
          no_of_friends_chats: result.length,
          user_chats: result,
        });
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};
