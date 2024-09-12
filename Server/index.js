
const express = require("express");
const app = express();
const cors = require("cors");
const con=require("./config/db");
const http = require('http');
const socketIo = require('socket.io');
const messageRoutes = require("./routes/messageRoute");
require("dotenv").config();
app.use(cors());
app.use(express.json());

con.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
    }
  });
  
  con.query("CREATE DATABASE IF NOT EXISTS messaging_app", (err) => {
      if(err){
          console.log(err);
      }
      else{
         con.query(`CREATE TABLE IF NOT EXISTS users (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(100),
           email VARCHAR(100) UNIQUE,
           password VARCHAR(255),
           status ENUM('online', 'offline') DEFAULT 'offline',
           role ENUM('Student', 'Teacher', 'Institute'),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )`, (err) => {
           if(err){
               console.log(err);
           }
           else{
               console.log("users table created");
           }
         })
  
         con.query(`CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          sender_id INT,
          receiver_id INT,
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
        )`
        , (err) => {
           if(err){
               console.log(err);
           }
           else{
               console.log("messages table created");
           }
         })
      }
  
  })

  const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });


  socket.on("sendMessage", (messageData) => {
   
    io.emit("receiveMessage", messageData);
  });
});


  const authRoutes =require("./routes/authRoutes");
  app.use("/api/auth", authRoutes);
  app.use('/api', messageRoutes);




  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })