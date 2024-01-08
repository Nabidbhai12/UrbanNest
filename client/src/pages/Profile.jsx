// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useRef, useState, useEffect } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
// } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { Link, Navigate } from 'react-router-dom';
// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);
//   const dispatch = useDispatch();

//   // firebase storage
//   // allow read;
//   // allow write: if
//   // request.resource.size < 2 * 1024 * 1024 &&
//   // request.resource.contentType.matches('image/.*')

//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };
//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch('/api/auth/signout', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
     
//     } catch (error) {
//       // Here, 'data' is not defined, so you cannot use it
//       dispatch(deleteUserFailure(error.message));
//     }
//   };
  
  

//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }

//       setUserListings(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// const useListings = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [rentedProperties, setRentedProperties] = useState([]);
//   const [boughtProperties, setBoughtProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch('/api/listing');
//         const data = await response.json();

//         if (response.ok) {
//           // Assuming the API returns an object with keys 'wishlist', 'rented', and 'bought'
//           setWishlist(data.wishlist);
//           setRentedProperties(data.rented);
//           setBoughtProperties(data.bought);
//         } else {
//           throw new Error(data.message || 'Error fetching listings');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   return { wishlist, rentedProperties, boughtProperties, isLoading, error };
// };

//   return (
//     <div className='bg-gray-100 min-h-screen p-6'>
//       <div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-6'>
//         <div className='flex items-center space-x-4'>
//           <img
//             onClick={() => fileRef.current.click()}
//             src={formData.avatar || currentUser.avatar}
//             alt='profile'
//             className='rounded-full h-32 w-32 object-cover'
//           />
//           <div>
//             <h2 className='text-2xl font-semibold'>{currentUser.username}</h2>
//             {/* Add more user info here */}
//           </div>
//         </div>
//       </div>
  
//       {/* Wishlist Section */}
//       <div className='max-w-4xl mx-auto mb-6'>
//         <h3 className='text-xl font-semibold mb-4'>Wishlist</h3>
//         <div className='grid grid-cols-3 gap-4'>
//           {/* Map through wishlist items */}
//           {userListings.wishlist.map((item) => (
//             <div key={item._id} className='bg-white p-2 rounded-lg shadow'>
//               <img src={item.imageUrls[0]} alt='listing' className='h-40 w-full object-cover rounded-t-lg' />
//               {/* Add more content here if needed */}
//             </div>
//           ))}
//         </div>
//       </div>
  
//       {/* Rented Property List Section */}
//       <div className='max-w-4xl mx-auto mb-6'>
//         <h3 className='text-xl font-semibold mb-4'>Rented Property List</h3>
//         <div className='grid grid-cols-3 gap-4'>
//           {/* Map through rented property items */}
//           {userListings.rented.map((item) => (
//             <div key={item._id} className='bg-white p-2 rounded-lg shadow'>
//               <img src={item.imageUrls[0]} alt='listing' className='h-40 w-full object-cover rounded-t-lg' />
//               {/* Add more content here if needed */}
//             </div>
//           ))}
//         </div>
//       </div>
  
//       {/* Bought Property List Section */}
//       <div className='max-w-4xl mx-auto mb-6'>
//         <h3 className='text-xl font-semibold mb-4'>Bought Property List</h3>
//         <div className='grid grid-cols-3 gap-4'>
//           {/* Map through bought property items */}
//           {userListings.bought.map((item) => (
//             <div key={item._id} className='bg-white p-2 rounded-lg shadow'>
//               <img src={item.imageUrls[0]} alt='listing' className='h-40 w-full object-cover rounded-t-lg' />
//               {/* Add more content here if needed */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
//           }  
import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
} from '../redux/user/userSlice';

export default function Profile() {
  // Existing state and hooks
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  // ... other local states like filePerc, formData, updateSuccess, etc.

  // Data and states from useListings hook
  const useListings = () => {
      const [wishlist, setWishlist] = useState([]);
      const [rentedProperties, setRentedProperties] = useState([]);
      const [boughtProperties, setBoughtProperties] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchListings = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('/api/listing');
            const data = await response.json();
    
            if (response.ok) {
              // Assuming the API returns an object with keys 'wishlist', 'rented', and 'bought'
              setWishlist(data.wishlist);
              setRentedProperties(data.rented);
              setBoughtProperties(data.bought);
            } else {
              throw new Error(data.message || 'Error fetching listings');
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchListings();
      }, []);
    
      return { wishlist, rentedProperties, boughtProperties, isLoading, error };
    };
    
  const {
    wishlist,
    rentedProperties,
    boughtProperties,
    isLoading,
    error
  } = useListings();

  // Existing handlers (e.g., handleChange, handleSubmit, handleDeleteUser, etc.)

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/signin');
    return null; // or some kind of loading indicator
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Profile page content
  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-6'>
        {/* User information */}
        <div className='flex items-center space-x-4'>
          <img
            onClick={() => fileRef.current.click()}
            src={currentUser.avatar || 'default-avatar-url'} // Replace 'default-avatar-url' with actual default avatar
            alt='profile'
            className='rounded-full h-32 w-32 object-cover'
          />
          <div>
            <h2 className='text-2xl font-semibold'>{currentUser.username}</h2>
            {/* Additional user details */}
          </div>
        </div>
      </div>

      {/* Wishlist Section */}
      <ListingsSection title="Wishlist" listings={wishlist} />

      {/* Rented Property List Section */}
      <ListingsSection title="Rented Property List" listings={rentedProperties} />

      {/* Bought Property List Section */}
      <ListingsSection title="Bought Property List" listings={boughtProperties} />
    </div>
  );
}

// Component to render each section of listings
const ListingsSection = ({ title, listings }) => {
  return (
    <div className='max-w-4xl mx-auto mb-6'>
      <h3 className='text-xl font-semibold mb-4 text-gray-800'>{title}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {listings.map((listing) => (
          <div key={listing._id} className='bg-white p-2 rounded-lg shadow-lg'>
            <img
              src={listing.imageUrls[0]}
              alt={listing.name}
              className='h-40 w-full object-cover rounded-t-lg'
            />
            {/* Other listing details */}
          </div>
        ))}
      </div>
    </div>
  );
};

 
