// import express from 'express'
// import mongoose, { set } from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import searchRouter from './routes/search.route.js';
// import blogRouter from './routes/blog.route.js';
// import conversationRouter from './routes/conversation.route.js';
// import cookieParser from 'cookie-parser';
// import initSocketServer from './socketServer.js';
// import {createServer} from 'http';
// import cors from 'cors';

// dotenv.config();
// mongoose.connect(process.env.MONGO).then(()=>{  
//     console.log('connected to mongodb');
// }
// ).catch((err)=>{
//     console.log(err);
// }
// );

// const app=express();
// // app.listen(3000,()=>{
// //     console.log('server is running on port 3000');
// // }
// // );
// const httpServer = createServer(app);
// initSocketServer(httpServer);

// const allowedOrigins = ['http://localhost:5173'];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//           callback(null, true);
//         } else {
//           callback(new Error('Not allowed by CORS'));
//         }
//       },
//       credentials: true, // Allowing cookies and authorization headers
//   };

// app.use(cors(corsOptions));


// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/users",userRouter);
// app.use("/api/auth",authRouter);
// app.use("/api/listings",listingRouter);
// app.use("/api/search",searchRouter);
// app.use("/api/conversation",conversationRouter);
// app.use("/api/blogs",blogRouter);
// app.use((err,req,res,next) => {
//    const statusCode = err.statusCode || 500;
//    const msg=err.message || "internal server error";
//    return res.status(statusCode).json({
//       success:false,
//       statusCode,
//         msg
//    });
// }
// );

import express from 'express'
import mongoose, { set } from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import searchRouter from './routes/search.route.js';
import blogRouter from './routes/blog.route.js';
import conversationRouter from './routes/conversation.route.js';
import cookieParser from 'cookie-parser';
import initSocketServer from './socketServer.js';
import {createServer} from 'http';
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Initialize express app
const app = express();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // Allowing cookies and authorization headers
  };

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listings",listingRouter);
app.use("/api/search",searchRouter);
app.use("/api/conversation",conversationRouter);
app.use("/api/blogs",blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

const httpServer = createServer(app);

// Initialize Socket.IO server
initSocketServer(httpServer);

// Listen on port 3000
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
