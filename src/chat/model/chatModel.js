import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    connect : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Connect"
    },
    person : {
        type : String,
        enum : ["person1", "person2"]
    },
    message : {
        type:String
    },
    time :{
        type: Date,
        default: Date.now()
    }
}, {versionKey:false})

const chat = mongoose.model("Chat", chatSchema)
module.exports = chat