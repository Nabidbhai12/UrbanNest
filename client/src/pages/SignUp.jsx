import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    role: '',
    bio: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (warning) setWarning('');
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);

    console.log("Test: " + event.target.files[0]);
    console.log("Profile picture: " + profilePicture);
    if (warning) setWarning('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setWarning('Passwords do not match.');
      return;
    }

    // Prepare FormData for sending file and text fields
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Exclude confirmPassword from being sent to the backend
      if (key !== 'confirmPassword') {
        formDataToSend.append(key, value);
      }
    });
    if (profilePicture) {
      formDataToSend.append('profilePicture', profilePicture);
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formDataToSend, // send the FormData
      });

      console.log(res);
      console.log(formDataToSend);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="max-w-md w-full bg-white bg-yellow-70 rounded-lg shadow-xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" encType="multipart/form-data">
          {/* Username */}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={handleChange} />
          </div>
  
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
          </div>
  
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
          </div>
  
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" onChange={handleChange} />
            {warning && <p className="text-red-500 text-xs italic">{warning}</p>}
          </div>
  
          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="sr-only">Contact Number</label>
            <input id="contactNumber" name="contactNumber" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contact Number" onChange={handleChange} />
          </div>
  
          {/* Role */}
          <div>
            <label htmlFor="role" className="sr-only">Role</label>
            <input id="role" name="role" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Role" onChange={handleChange} />
          </div>
  
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="sr-only">Bio</label>
            <textarea id="bio" name="bio"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Bio" onChange={handleChange} />
          </div>
  
          {/* Profile Picture */}
          <div>
            <label htmlFor="profilePicture" className="sr-only">Profile Picture</label>
            <input id="profilePicture" name="profilePicture" type="file" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" onChange={handleFileChange} />
          </div>
  
          {/* Sign Up Button */}
          <div>
            <button disabled={loading} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
  
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
        <div className="text-sm">
          <Link to="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
  
}
