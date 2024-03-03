// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch,useSelector } from 'react-redux';
// import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';




// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//  const {loading,error}=useSelector(state=>state.user)
//  const [warning, setWarning] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     // Reset warning when user starts correcting
//     if (warning) setWarning('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(signInStart());

   

//     // Replace with your authentication logic
//     try {
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', 
//       });

//       const data = await res.json();
//      if(data.success==false){
//         setWarning(data.message);
//         console.log(data.message);
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       //vlocalStoragee token to 
//       console.log(data);

//       dispatch(signInSuccess(data));
//       navigate('/'); // Redirect to profile or dashboard upon successful login
//     } catch (err) {
//       dispatch(signInFailure(err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-yellow-50">
//     <div className="max-w-md w-full bg-yellow-50 rounded-lg shadow-xl p-8">
//       <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign In</h2>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {warning && <p className="text-red-500 text-center">{warning}</p>}
//       <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//         <div className="rounded-md -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 onChange={handleChange}
//               />
//             </div>
            
//           </div>

//           <div className="space-y-4">

//           <button
//               disabled={loading}
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {loading ? 'Loading...' : 'Sign In'}
//             </button>
            
//             <OAuth />
//           </div>
//           <div className="text-sm text-center">
//             <Link to="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Don't have an account? Sign Up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';
import '../styles/color.css';

const theme = createTheme();

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (warning) setWarning('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success === false) {
        setWarning(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/'); // Redirect to home page upon successful login
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?sign-in)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => 
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: colors.yellow[50],
            
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: colors.orange[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {error && <Typography color="error">{error}</Typography>}
              {warning && <Typography color="error">{warning}</Typography>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                sx={{ backgroundColor:"#fff7f0", borderColor:"#ff8b46"}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:"#ff8b46"}}
                disabled={loading}
                
              >
                {loading ? 'Loading...' : 'Sign In'}
              </Button>
              <OAuth />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
