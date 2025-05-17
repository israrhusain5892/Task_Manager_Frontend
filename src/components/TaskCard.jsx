// src/components/TaskCard.jsx
"use client"
import { useGlobalContext } from '@/app/Context/GlobalContext';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ title, description, status, onEdit, onDelete }) => {
  // Determine badge color based on status
   const{user}=useGlobalContext()
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    inprogress: 'bg-blue-100 text-blue-800',
  };

  const badgeColor = statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${badgeColor}`}>
          {status}
        </span>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 flex space-x-2">
      
          <button
          onClick={onEdit}
          className="flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
     
        {
           user.role.toLowerCase()==='admin' &&  <button
          onClick={onDelete}
          className="flex items-center px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
        }
       
      </div>
    </div>
  );
};

export default TaskCard;
