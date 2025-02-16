import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import SummaryApi from '../API/BackendApi';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('User', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Request failed: " + error.message);
    }
  };

  const handleGoogleLogin = (response) => {
    try {
      if (!response || !response.credential) {
        throw new Error("Invalid response from Google");
      }
  
      // Decode the Google JWT token
      const userData = jwtDecode(response.credential);
  
      if (!userData || !userData.email) {
        throw new Error("Invalid token data");
      }
  
      console.log("Google User Data:", userData);
  
      // Store token and user data in localStorage
      localStorage.setItem("token", response.credential);
      localStorage.setItem("User", JSON.stringify(userData));
  
      // Redirect user after successful login
      navigate("/admin");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      setError("Google login failed. Please try again.");
    }
  };
  

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='flex flex-col shadow-lg p-8 rounded-lg bg-white w-full max-w-sm'>
        <h1 className='font-semibold text-2xl text-center text-gray-700 mb-6'>Login Form</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-gray-600'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password" className='text-gray-600'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className='bg-blue-500 text-white font-semibold p-3 rounded-lg w-full hover:bg-blue-600 transition'>
            Submit
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError('Google Login Failed')} />
        </div>

        <div className='mt-4 text-center'>
          <p>No account? <Link to="/register" className='text-blue-500 font-semibold'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
