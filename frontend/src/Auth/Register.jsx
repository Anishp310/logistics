import React, { useState } from 'react';
import SummaryApi from '../API/BackendApi';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    landmark: '',
    password: '',
  });
  const navigate = useNavigate()
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Logging the form data for debugging

    try {
      const response = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        navigate("/login")

      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Request failed, please try again later.");
      console.error("Request failed", error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='flex flex-col shadow-lg p-8 rounded-lg bg-white w-full max-w-4xl'>
        <h1 className='font-semibold text-2xl text-center text-gray-700 mb-6'>Registration Form</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="name" className='text-gray-600'>Username</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your username'
              className='rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              autoComplete='name'
            />
          </div>

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
              autoComplete='email'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="phone" className='text-gray-600'>Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="tel"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="address" className='text-gray-600'>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="address"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="role" className='text-gray-600'>Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="consignee">Consignee</option>
              <option value="consigner">Consignor</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="landmark" className='text-gray-600'>Landmark</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Enter your landmark"
              className="rounded-md border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className='bg-blue-500 text-white font-semibold p-3 rounded-lg w-full hover:bg-blue-600 transition'>
            Submit
          </button>
        </form>
        <div className='mt-4'>
          <p>Already have an account? Please 
            <Link to="/login" className='text-blue-500 font-semibold'> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
