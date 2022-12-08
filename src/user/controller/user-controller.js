import User from "../model/user-model";
import mongoose from "mongoose"

export const greetings = (req, res) => {
  res.status(200).json({
    greet: "Welcome to the chat App",
  });
};

export const showAllUsers = async (req, res) => {
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

export const createUser = async (req, res) => {
  try {
    // console.log(req.file);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
    });
    console.log(req.file.originalname);
    if(req.file){
       user.profile_picture = req.file.originalname
    }
    else{
      console.log("file not selected");
    }
    user.save();
    res.status(200).json({
      createdUser: user,
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const getUserById = async (req, res) => {
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

export const lastChatOfUser = async (req, res) => {

  const user = await User.findOne({ id: req.body.id });
  res.status(200).json({
    name: user,
  });
};

export const createUserByFileUpload = async (req, res)=>{
  // console.log(req.body);
  // console.log(req.file);
  try {
    const user = await new User({
      _id: mongoose.Types.ObjectId(),
      name:req.body.name
    })
    const filename = req.files.profile_pic.name
    console.log(filename);
    const file = req.files.profile_pic
    file.mv('./upload/'+ filename, (err)=>{
      if(err){
        return console.log("File not uploaded");
      }
      user.profile_picture = "./upload/" + filename
      user.save()
      res.status(201).json({
        status:"Success",
        message:"user created",
        created_user:user
      })
    })
  } catch (error) {
    res.send(error.message)
  }
}

export const updateProfilePic = async(req, res)=>{
  try {
    if(req.files){
      const filename = req.files.profile_pic.name
      const file = req.files.profile_pic
      file.mv('./upload/'+ filename, async (err)=>{
        if(err){
          return res.status(400).json({
            status:"Fail",
            message:"Couldn't able to update picture"
          })
        }
        const updation = await User.findByIdAndUpdate(req.body.id, {profile_picture:"./upload/" + filename}, {new:true})
        res.status(200).json({
          updated_profile:updation
        })
      })
    }
  } catch (error) {
    res.send(error.message)
  }
}
