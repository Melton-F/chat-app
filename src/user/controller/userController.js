import User from "../model/userModel";
import Chat from "../../chat/model/chatModel";
import mongoose from "mongoose"

exports.greetings = (req, res) => {
  res.status(200).json({
    greet: "Welcome to the chat App",
  });
};

exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users < 1) {
      return res.send("No users found");
    }
    res.status(200).json({
      user_counts: users.length,
      allUsers: users,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      // contacts: req.body.contacts,
    });
    //   console.log(req.body);
    //   if (req.file) {
    //     user.profile_picture = req.file.path;
    //     console.log("inside req.file");
    //   }
    user.save();
    res.status(200).json({
      createdUser: user,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(200).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.lastChatOfUser = async (req, res) => {
  // const user = await User.findById(req.body.id)
  // let chatIndx = user.messagesId.length-1
  // let lastChat = user.messagesId[chatIndx]
  // // console.log(lastChat);
  // console.log(user.messagesId);

  // const chat = await Chat.aggregate([
  //     {
  //       $group: {
  //         _id:"$status",
  //         count:{"$count":req.body.id}
  //       }
  //     }
  // ])

  // res.status(200).json({
  //     chat_by_status:chat
  // })
  const user = await User.findOne({ id: req.body.id });
  // const userContacts = user.contacts
  res.status(200).json({
    // receiverId:userContacts,
    name: user,
  });
};

// exports.uploadImage = async (req, res) => {
//     try {
//       const newImage = await new Product(req.body);
//     //   console.log(req.file);
//       if (req.file) {
//         console.log(req.file);
//         newImage.product_image = req.file.path;
//       }
//       newImage.save();
//       res.status(201).json({
//         status: "success",
//         message: "successfully created",
//         image: newImage.product_image,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
