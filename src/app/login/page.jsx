// src/components/Login.jsx
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { FcParallelTasks } from "react-icons/fc";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
// import SubmitLoader from '../components/SubmitLoader';
import SubmitLoader from '@/components/SubmitLoader';
import { loginUser } from '@/Api';
import { GrView } from "react-icons/gr";
const Login = () => {

   const[text,setText]=useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission (e.g., API call)
       setLoading(true);
      try {
        const response = await loginUser(formData);
        console.log('Form submitted:', response.data);
        if (response.status === 200 || response.status == 201) {
          setLoading(false)
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Login successfully !!")
          setTimeout(()=>{
               window.location.href='/UserDashboard'
          },2000)
          
        }
        
      }

      catch (error) {
        toast.error("some thing went wrong try again", error)
        setLoading(false);
      }

      // Reset form
      setFormData({ email: '', password: '' });
    } else {
      setErrors(validationErrors);
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-10 md:gap-2  md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer position="top-center"></ToastContainer>
      <div className='md:w-1/2 w-full'>
        <h1 className='w-full text-center md:text-5xl text-3xl h-auto text-blue-600 font-bold'>Task Manager Application</h1>
        <p className='text-center py-2 md:text-2xl text-lg text-gray-500'> A user can track progress on a project</p>
        <FcParallelTasks className='text-center text-2xl  mx-auto w-20 h-20 mt-4' />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
               type={text?'text':'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <GrView onClick={()=>setText(!text)} className='absolute bottom-3 right-4 cursor-pointer text-gray-600' />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          > 
          {
              isLoading ?<SubmitLoader/> :'Login In'
          }
            
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/" className="text-blue-600 hover:underline" >
               Sign up
          </Link>
          
        </p>
      </div>
    </div>
  );
};

export default Login;
