import { set } from 'mongoose';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';


export default function SignUp() 
{
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit =async (e) => { 
      e.preventDefault();
      setLoading(true);
      //send to backend with proxy
      const res=await fetch('/api/auth/signup',
      {
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      });
      //print
      const data=await res.json();
      if(data.success===false)
      {
        setLoading(false);
        setError(data.error);
        
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')

      console.log(data);
      
      
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" 
              required className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full Name" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" 
      required className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign In
              </a>
            </div>
          </div>

          <div>
            <button disabled={loading} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
             {loading ? 'loading...' : 'Sign Up'}
             
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
