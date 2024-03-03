// src/socketServer.js
import { Server } from 'socket.io';
import ConversationModel  from './models/conversation.model.js'; // Adjust imports based on your project structure
import  MessageModel  from './models/message.model.js'; // Adjust imports based on your project structure
import cors from 'cors';

const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:5173'], // Adjust according to your needs
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on("joinUserRoom", ({ userId }) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });


    socket.on('sendMessage', async ({ senderId, receiverId, text, conversationId }) => {
      try {
        let conversation;
        if (conversationId) {
          conversation = await ConversationModel.findById(conversationId);
        } else {
          conversation = await ConversationModel.findOneAndUpdate(
            { $or: [{ sender: senderId, receiver: receiverId }, { sender: receiverId, receiver: senderId }] },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        }

        const message = new MessageModel({
          conversationId: conversation._id,
          sender: senderId,
          receiver: receiverId,
          content: text,
        });
        await message.save();

        io.to(conversation._id.toString()).emit('newMessage', message);
      } catch (error) {
        console.error("Error sending/saving message:", error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};

export default initSocketServer;
