
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; // Adjust the path as necessary
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import {connectDB} from './lib/db.js'
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT;

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});