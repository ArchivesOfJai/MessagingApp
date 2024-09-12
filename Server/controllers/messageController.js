const con = require("../config/db");
const url=require('url');

// Send Message
exports.sendMessage = async (req, res) => {
  const { receiver_id } = url.parse(req.url, true).query;
  const { message } = req.body;
  const sender_id = req.user.id;
  
  try {
    con.query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message],
      function (err, result) {
        if (result.affectedRows === 0) {
          return res.status(500).json({ error: "Error sending message" });
        }
        console.log("Message sent");
        res.status(201).json({ message: "Message sent" });
      }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

// View Messages
exports.getMessages = async (req, res) => {
  const { receiver_id } = url.parse(req.url, true).query;
  let username;
  con.query(`SELECT name FROM users WHERE id = ${receiver_id}`, function (err, result) {
    username=result[0].name
  });
  const userId = req.user.id;
  try {
    con.query(
      "SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ?",
      [userId, receiver_id],
      function (err, messages) {
        console.log("Messages retrieved");
        res.status(200).json({ messages,username });
      }
    );
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Error retrieving messages" });
  }
};

// View Users
exports.getUsers = async (req, res) => {
  try {
    con.query(
      "SELECT * FROM users WHERE id != ?",
      [req.user.id],
      function (err, users) {
        if (err) {
          console.log("Error retrieving users:", err);
          return res.status(500).json({ error: "Error retrieving users" });
        }
        console.log("Users retrieved");
        res.status(200).json({users});
      }
    );
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};