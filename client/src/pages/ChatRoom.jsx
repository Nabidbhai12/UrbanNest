import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000'); // Adjust this to your server's address

const chatRoom = () => {
    const { userId } = useParams(); // Assuming you're using react-router-dom and userId is the id of the user you're chatting with
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    console.log("UserId: " + userId);

    const sendMessage = (e) => {
        e.preventDefault();
        if (text.trim()) {
          socket.emit('sendMessage', { receiverId: userId, text });
          setText('');
        }
    };

    useEffect(() => {
        socket.emit('joinRoom', { userId });
    
        socket.on('receiveMessage', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
          socket.off('receiveMessage');
        };
    }, [userId]);

    return (
        <div className="flex flex-col h-screen">
          <div className="overflow-auto flex-grow p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="text-white bg-blue-500 p-2 rounded">
                {msg.senderId}: {msg.text}
              </div>
            ))}
          </div>
          <form className="p-4" onSubmit={sendMessage}>
            <input
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full mt-2" type="submit">
              Send
            </button>
          </form>
        </div>
    );

};

export default chatRoom;