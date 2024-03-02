import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import searchRouter from './routes/search.route.js';
import blogRouter from './routes/blog.route.js';
import conversationRouter from './routes/conversation.route.js';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{  
    console.log('connected to mongodb');
}
).catch((err)=>{
    console.log(err);
}
);

const app=express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Your frontend origin
        methods: ["GET", "POST"],
        //allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

httpServer.listen(3000,()=>{
    console.log('server is running on port 3000');
}
);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Handle sending and receiving messages
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        // Emit the message to the receiver
        io.to(receiverId).emit('receiveMessage', { senderId, text });

        // Save the message to the database 
        
    });

    socket.on('joinRoom', ({ userId }) => {
        socket.join(userId); // Uses user ID as room name
        console.log(`User joined room: ${userId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });

});

app.use(express.json());
app.use(cookieParser());
app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listings",listingRouter);
app.use("/api/search",searchRouter);
app.use("/api/conversation",conversationRouter);
app.use("/api/blogs",blogRouter);
app.use((err,req,res,next) => {
   const statusCode = err.statusCode || 500;
   const msg=err.message || "internal server error";
   return res.status(statusCode).json({
      success:false,
      statusCode,
        msg
   });
}
);

