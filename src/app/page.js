"use client"

import SideBar from "@/components/SideBar";
import './globals.css';

import axios from 'axios';
import { useState } from 'react';
import { FcParallelTasks } from "react-icons/fc";
import { toast, ToastContainer } from 'react-toastify';
import SubmitLoader from '../components/SubmitLoader';
import Link from 'next/link';
import { GrView } from "react-icons/gr";
import { register } from '../Api';



const Signup = () => {

  const [isLoading, setLoading] = useState(false);
  const[text,setText]=useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

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
      setLoading(true)
      try {
        const response = await register(formData);
        if (response.status === 201 || response.status === 200) {
          setLoading(false)
          toast.success("You have signup successfully !!");
          setTimeout(()=>{
              navigate("/login");
          },1000)
          
        }
        else {
          toast.error("Some thing went wrong!!")
          setLoading(false)
        }

      }

      catch (error) {
        toast.error("some thing went wrong try again", error);
        setLoading(false)
      }

      // Reset form
      setFormData({ name: '', email: '', password: '' });
    } else {
      setErrors(validationErrors);
      setLoading(false)
    }
  };

  return (
    <div className='fl'>
      <ToastContainer position="top-center"></ToastContainer>

      <div className="flex items-center justify-center flex-col md:flex-row min-h-screen bg-gray-100 px-4">
        <div className='md:w-1/2'>
          <h1 className='w-full text-center md:text-5xl text-3xl h-auto text-blue-600 font-bold'>Task Manager Application</h1>
          <p className='text-center py-2 md:text-2xl text-lg text-gray-500'> A user can track progress on a project</p>
          <FcParallelTasks className='text-center text-2xl  mx-auto w-20 h-20 mt-4' />
        </div>


        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
              <GrView onClick={()=>setText(!text)} className='absolute bottom-3 right-4 cursor-pointer text-gray-600' />
             
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>


            <button
              type="submit"
              className="w-full cursor-pointer relative bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLoading ? (
                <SubmitLoader />
              ) : (
                'Sign Up'
              )}

            </button>



          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
                Log In
            </Link>
          </p>
        </div>
      </div>

    </div>

  );
};

export default Signup;


