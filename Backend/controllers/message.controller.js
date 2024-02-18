import { getReceiverSocketId } from "../socket/socket.js";
import Conversation from "./../models/conversation.model.js";
import Message from "./../models/message.model.js";
import { io } from "./../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let convo = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      convo.messages.push(newMessage._id);
    }

    // await convo.save();
    // await newMessage.save();

    //
    await Promise.all([convo.save(), newMessage.save()]);

    //SOCKET.IO Functionality comes here
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      /// Send to specific clients
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in SendMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in SendMessage Controller: ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
