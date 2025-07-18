import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // adjust this in production
  },
});

// Map to store userId -> socketId
const userSocketMap = {}; // { userId: socketId }

// Function to get socketId of a receiver user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Handle socket connections
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Get userId from query (sent during socket connection)
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;

    // Save the userId in socket for use on disconnect
    socket.data.userId = userId;
  }

  // Emit updated online users list to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("🌐 Online users:", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);

    const disconnectedUserId = socket.data.userId;
    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("🌐 Online users after disconnect:", Object.keys(userSocketMap));
  });
});

export { io, app, server };
