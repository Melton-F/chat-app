import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String},
    profile_picture:{type:String}
}, {versionKey:false})

const user = mongoose.model("User", userSchema)
module.exports = user

