const con = require("../config/db");

// Send Message
exports.sendMessage = async (req, res) => {
  const { receiver_id, message } = req.body;
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
  const { receiver_id } = req.body;
  const userId = req.user.id;
  try {
    con.query(
      "SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ?",
      [userId, receiver_id],
      function (err, messages) {
        console.log("Messages retrieved");
        res.status(200).json({ messages });
      }
    );
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Error retrieving messages" });
  }
};
