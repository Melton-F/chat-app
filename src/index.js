import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
// import upload = from ("multer")
// import busboy from "connect-busboy"

import userRouter from "./user/router/user-router";
import chatRouter from "./chat/router/chat-router";
import connectRouter from "./connection/router/connect-router";
const app = express();

// app.use(upload.array())
// app.use(busboy())

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/upload', express.static('upload'))

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
app.use("/connect", connectRouter);
