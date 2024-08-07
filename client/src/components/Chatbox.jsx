import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
//import { useSelector } from "react-redux";

// Assuming the server is running on the same host but different port
const socket = io('http://localhost:3000', {
    withCredentials: true,
});

const Chatbox = ({ currentUser, receiverId, conversationId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Join a room for the current conversation or create one if it doesn't exist
    socket.emit('joinUserRoom', { userId: currentUser._id, receiverId });

    // Listening for new messages
    socket.on('newMessage', (message) => {
        if (message.conversationId === conversationId) { // currentConversationId should be passed as a prop
            setMessages((prevMessages) => [...prevMessages, message]);
        }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [currentUser, receiverId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
        const messageToSend = {
          senderId: currentUser._id,
          receiverId,
          text: newMessage,
          // Add the conversationId if it exists
          conversationId, // This should be passed as a prop to Chatbox
        };
    
        socket.emit('sendMessage', messageToSend);
        
        // Optimistically update the message list
        setMessages(messages => [...messages, messageToSend]);
        
        setNewMessage('');
      }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-100 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-4 rounded-lg shadow-lg space-y-4">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>X</button>
        <div className="h-64 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === currentUser._id ? 'text-right' : ''}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 w-full"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
