import mongoose from "mongoose";

const connectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    person1:{
        type:String
    },
    person2:{
        type:String
    }
})

const connect = mongoose.model("Connect", connectSchema)
module.exports = connect