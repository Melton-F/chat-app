import Chat from "../model/chatModel";
import User from "../../user/model/userModel";

exports.createNewChat = async (req, res) => {
  try {
    const chat = await new Chat({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      status: req.body.status,
    });
    chat.save();

    let user1 = await User.findById(req.body.sender);
    // let user2 = await User.findById(req.body.receiver);

    // oldContact1 = user1.contacts;
    // oldContact1.push(req.body.receiver);

    const updation1 = await User.findByIdAndUpdate(
      req.body.sender,
      { contacts: req.body.receiver },
      { new: true }
    );

    // oldContact2 = user2.contacts;
    // oldContact2.push(req.body.sender);

    const updation2 = await User.findByIdAndUpdate(
      req.body.receiver,
      { contacts: req.body.sender },
      { new: true }
    );

    let chat3 = await Chat.findOne({ message: req.body.message });
    let someArr = user1.messagesId;
    // console.log(someArr);
    someArr.push(chat3._id);
    const updation3 = await User.findOneAndUpdate(
      { _id: req.body.sender },
      { messagesId: someArr },
      { new: true }
    );

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

exports.chatFindByStatus = async (req, res) => {
  try {
    const chat = await Chat.find({
      sender: req.body.user,
      status: req.body.status,
    });
    if (chat < 1) {
      return res.status(200).json({
        message: `Sorry... No chats are in the status of ${req.body.status} for the user ${req.body.user}`,
      });
    }
    // let data = [];
    // chat.forEach(el=>{
    //   console.log(el);
    //   let chats = "Reveiver(" + el.receiver + ')'+ " : "+ el.message
    //   data.push(chats)
    // })
    // console.log(data)

    res.status(200).json({
      message: `chats by status : ${req.body.status} for the user ${req.body.user}`,
      chat_count: chat.length,
      chats: chat,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.singleChat = async (req, res) => {
  try {
    const personalChat = await Chat.find({
      $or: [
        { sender: req.body.person1, receiver: req.body.person2 },
        { sender: req.body.person2, receiver: req.body.person1 },
      ],
    });
    console.log(personalChat);
    res.status(200).json({
      chats: personalChat,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.lastChat = async (req, res) => {
  // const lastChatOfUsers =
  const user = await User.findOne({ name: req.body.name });
  // console.log(user._id);
  const chat = await Chat.find({ sender: user._id });
  console.log(chat);
};
