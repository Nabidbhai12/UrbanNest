// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     contactNumber: '',
//     role: '',
//     bio: ''
//   });
//   const [profilePictureUrl, setProfilePictureUrl] = useState('');
//   const [warning, setWarning] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//     if (warning) setWarning('');
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       setWarning('No file selected.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     setLoading(true);
//     try {
//       const response = await fetch('/api/auth/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload image.');
//       }

//       const data = await response.json();
//       setProfilePictureUrl(data.url); // Assuming the response contains the URL in a property named 'url'
//       setLoading(false);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { password, confirmPassword } = formData;
//     if (password !== confirmPassword) {
//       setWarning('Passwords do not match.');
//       return;
//     }

//     // Exclude confirmPassword from being sent to the backend
//     const { confirmPassword: _, ...dataToSend } = formData;
//     dataToSend.profilePicture = profilePictureUrl; // Add the profile picture URL to the form data

//     setLoading(true);
//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!res.ok) {
//         throw new Error('Something went wrong during signup.');
//       }

//       setLoading(false);
//       setError(null);
//       navigate('/sign-in'); // Redirect to sign-in page upon successful signup
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-yellow-50">
//       <div className="max-w-md w-full bg-white bg-yellow-70 rounded-lg shadow-xl p-8">
//         <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6" encType="multipart/form-data">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="sr-only">Username</label>
//             <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={handleChange} />
//           </div>
  
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="sr-only">Email address</label>
//             <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
//           </div>
  
//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
//           </div>
  
//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
//             <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" onChange={handleChange} />
//             {warning && <p className="text-red-500 text-xs italic">{warning}</p>}
//           </div>
  
//           {/* Contact Number */}
//           <div>
//             <label htmlFor="contactNumber" className="sr-only">Contact Number</label>
//             <input id="contactNumber" name="contactNumber" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contact Number" onChange={handleChange} />
//           </div>
  
//           {/* Role */}
//           <div>
//             <label htmlFor="role" className="sr-only">Role</label>
//             <input id="role" name="role" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Role" onChange={handleChange} />
//           </div>
  
//           {/* Bio */}
//           <div>
//             <label htmlFor="bio" className="sr-only">Bio</label>
//             <textarea id="bio" name="bio"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Bio" onChange={handleChange} />
//           </div>
  
//           {/* Profile Picture */}
//           <div>
//             <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Profile Picture</label>
//             <input id="profilePicture" name="profilePicture" type="file" onChange={handleFileChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
//             {profilePictureUrl && <img src={profilePictureUrl} alt="Profile Preview" className="mt-4 w-20 h-20 object-cover rounded-full" />}
//           </div>
  
//           {/* Sign Up Button */}
//           <div>
//             <button disabled={loading} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//               {loading ? 'Loading...' : 'Sign Up'}
//             </button>
//           </div>
  
//           {error && <p className="text-red-500 text-xs italic">{error}</p>}
//         </form>
//         <div className="text-sm">
//           <Link to="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Already have an account? Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
  
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [warning, setWarning] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (warning) setWarning('');
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setWarning('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await fetch('/api/auth/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image.');
      }

      const data = await response.json();
      setProfilePictureUrl(data.url);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setWarning('Passwords do not match.');
      return;
    }

    const dataToSend = {
      ...formData,
      profilePicture: profilePictureUrl
    };
    delete dataToSend.confirmPassword; // Exclude confirmPassword from being sent to the backend

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        throw new Error('Something went wrong during signup.');
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in'); // Redirect to sign-in page upon successful signup
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Adjusted the fields according to the original structure */}
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {warning && <Typography color="error" variant="body2">{warning}</Typography>}
              </Grid>
              {/* Contact Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="contactNumber"
                  label="Contact Number"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </Grid>

              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="bio"
                  label="Bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </Grid>

              {/* Profile Picture */}
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  onChange={handleFileChange}
                />
                {profilePictureUrl && <img src={profilePictureUrl} alt="Profile Preview" />}
              </Grid>
              {/* Additional custom fields can be added here */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </Button>
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
