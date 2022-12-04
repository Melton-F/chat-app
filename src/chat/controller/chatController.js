import mongoose from "mongoose"
import Chat from "../model/chatModel";

exports.createNewChat = async (req, res) => {
  try {
    const chat = await new Chat({
      _id: mongoose.Types.ObjectId(),
      connect: req.body.connect,
      person: req.body.person,
      message: req.body.message
    });
    chat.save();

    res.status(201).json({
      chat,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.showAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      status: "success",
      no_of_chats: chats.length,
      chats: chats,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateChatById = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      updatedChat: chat,
    });
  } catch (error) {
    res.send(error.message);
  }
};


exports.showChatsByConnectId = async (req, res)=>{
  try {
    const chats = await Chat.find({connect:req.params.connectId})
    res.status(200).json({
      no_of_messages_in_chat:chats.length,
      chats:chats[chats.length-1]
    })
  } catch (error) {
    res.send(error.message)
  }
}