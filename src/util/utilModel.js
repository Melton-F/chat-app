import mongoose from "mongoose";

const utilSchema = new mongoose.Schema({
    output:{
        type:[],
        default:["data"]
    }
})
const util = mongoose.model("Util", utilSchema)
module.exports = util