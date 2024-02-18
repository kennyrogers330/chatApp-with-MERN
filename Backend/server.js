import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import connectToMongoDB from "./db/dbConnection.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
// import message
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
