import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/messages.css";

const Messages = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getmessages?receiver_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.messages);
      setReceiverName(response.data.username);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/sendmessages?receiver_id=${userId}`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage(""); // Clear input field
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <>
      <h3 className="receiver-name">Chat with {receiverName} </h3>
      <div className="messages-container">
        <ul>
          {messages.map((msg) => (
            <li className="nav-link" key={msg.id}>{msg.message}</li>
          ))}
        </ul>
        <div className="ms-3 position-absolute bottom-0 mb-3">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="ms-3" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Messages;
