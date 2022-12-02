import express from "express";
import mongoose from "mongoose";
// import upload = from ("multer")

import userRouter from "./user/router/userRouter";
import chatRouter from "./chat/router/chatRouter";
const app = express();

// app.use(upload.array())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/chat-task");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error) => {
    console.log("error is:", error);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);
