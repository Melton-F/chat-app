import User from "../model/userModel";
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
    });
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

  const user = await User.findOne({ id: req.body.id });
  res.status(200).json({
    name: user,
  });
};


