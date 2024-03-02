import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../styles/color.css";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await fetch('api/conversation/getUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }); // Adjust the URL based on your API endpoint
            // Check for successful response
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      {users.map((user) => (
        <button
          key={user._id}
          className="bg-yellow-50-custom hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/chat/${user._id}`)}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
};

export default UserList;
