import Connect from "../model/connectModel";
import Chat from "../../chat/model/chatModel";
import mongoose from "mongoose";
import Util from "../../util/utilModel";

exports.createChatConnection = async (req, res) => {
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

exports.chatConnections = async (req, res) => {
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

exports.userChats = async (req, res) => {
  try {
    const connectionByBothPersons = await Connect.find({
      $or: [{ person1: req.params.userId }, { person2: req.params.userId }],
    });

    let xxx = [];
    connectionByBothPersons.forEach(async (element, index) => {
      let chatsByConnection = await Chat.find({ connect: element._id });
      let lastIndex = chatsByConnection.length - 1;
      let resultObj = chatsByConnection[lastIndex];
      xxx.push(resultObj);
        if(xxx.length === 2){
            const updation = await Util.findByIdAndUpdate("638d1627956aebc8708e6f75", {output:xxx}, {new:true})
        }
    });
    const someObj = await Util.findById("638d1627956aebc8708e6f75")

    res.status(200).json({
      user_chats: someObj.output
    });
  } catch (error) {
    res.send(error.message);
  }
};
