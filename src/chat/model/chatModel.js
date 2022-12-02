import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    sender:{type:String},
    receiver:{type:String},
    message:{type:String},
    status:{type:String},//read send deliver
}, {versionKey:false})

const chat = mongoose.model("Chat", chatSchema)
module.exports = chat