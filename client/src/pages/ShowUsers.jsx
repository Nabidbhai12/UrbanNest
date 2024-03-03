// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import "../styles/color.css";

// const UserList = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
  
//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('api/conversation/getUsers', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             }); // Adjust the URL based on your API endpoint
//             // Check for successful response
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
        
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserClick = async (userId) => {
//     try {
//       const response = await fetch(`api/conversation/getOrCreateConversation/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const conversation = await response.json();
//       navigate(`/chat/${conversation._id}`); // Navigate using conversation ID
//     } catch (error) {
//       console.error('Error handling user click:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-2">
//       {users.map((user) => (
//         <button
//           key={user._id}
//           className="bg-yellow-50-custom hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => handleUserClick(user._id)}
//         >
//           {user.username}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../components/Chatbox';

const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [isChatroomOpen, setIsChatroomOpen] = useState(false);
    const [receiverId, setReceiverId] = useState(null);
    
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
                console.log("All users : ", data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleMessageInitiation = (receiverId) => {
        console.log(`Initiate message to user ${receiverId}`);
        // Here you could open a modal or redirect the user to a messaging component/page
        // For the purpose of this demonstration, we'll just log to the console.
    };

    return (
        <div className="flex flex-col space-y-2">
        {users.map((user) => (
            <div key={user._id} className="bg-yellow-50-custom p-4 rounded-lg shadow space-y-2">
            <div className="text-xl font-bold">{user.username}</div>
            <p className="text-gray-700">User's description here. Possibly fetched or static.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleUserClick(user._id)}
            >
              Send Message
            </button>
          </div>
        ))}
        </div>
    );
};

export default ShowUsers;