import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    avatar: currentUser?.avatar || 'default-avatar.png', // Provide a default avatar if needed
    // ... add other default properties if necessary ...
  });


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/users/getUserDetails`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include auth token if needed: 'Authorization': `Bearer ${token}`
          },
        });
        const data = await res.json();
        console.log(data);
  
        if (!data.success) {
          console.log(data.message); // Handle error
          return;
        }
  
        // Assuming data.user contains user details
        const userDetails = data.user;
        console.log("User details: ***", userDetails);
        setFormData({
          username: userDetails.username,
          email: userDetails.email,
          avatar: userDetails.profilePicture, // Make sure the key matches the one from your backend
          // ... include other properties as needed ...
          bio: userDetails.bio,
          contactNumber: userDetails.contactNumber,
          // ... and so on ...
        });
      } catch (error) {
        console.log("Error fetching user details:", error.message); // Handle error
      }
    };
  
    fetchUserDetails();
  }, []);
  

  // const handleFileUpload = (file) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setFilePerc(Math.round(progress));
  //     },
  //     (error) => {
  //       setFileUploadError(true);
  //     },
  //     () => {
  //       /* getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
  //         setFormData({ ...formData, avatar: downloadURL })
  //       ); */
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
  //         setFilePerc(100); // Indicate that upload is complete
  //       });
  //     }
  //   );
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filePerc < 100) {
      alert("Please wait until the file is fully uploaded.");
      return;
    }
    try {
      dispatch(updateUserStart());

      const data1 = new FormData();
      // Append file data if a file was uploaded
      if (file) {
        data.append('image', file);
      }
      // Append other form data
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => { 
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
         try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
         
        } catch (error) {
          // Here, 'data' is not defined, so you cannot use it
          dispatch(deleteUserFailure(error.message));
        }
      };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/listings/getlisting/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
   
      <div className='p-3 max-w-lg mx-auto'>
        <div className='flex items-start justify-between'>
          {/* User Image */}
          <img
            src={formData.avatar || 'default-avatar.png'} // Fallback to a default image if necessary
            alt='Profile'
            className='rounded-full h-24 w-24 object-cover'
          />
          {/* User Details and Actions */}
          <div className='flex-1 ml-4'>
            <h1 className='text-3xl font-semibold mb-3'>{formData.username}</h1>
            <p>{formData.email}</p>
            {/* User bio and contact number (optional) */}
            <p>{formData.bio}</p>
            <p>{formData.contactNumber}</p>
            {/* Sign Out and Update Profile buttons */}
            <div className='mt-4'>
              <button onClick={handleSignOut} className='text-red-700 mr-4'>Sign Out</button>
              <button onClick={handleShowListings} className='text-green-700'>Update Profile</button>
            </div>
          </div>
        </div>
        {/* ... rest of the component ... */}
      </div>
    );
    
}
