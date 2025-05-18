"use client"

import React from 'react';
import { FaHome, FaTasks, FaProjectDiagram, } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { IoCloudDoneOutline } from "react-icons/io5";
import { RiProgress4Line } from "react-icons/ri";
import Link from 'next/link';
import { getTasksByStatus ,getAllTasks} from '@/Api';
import { useGlobalContext } from '@/app/Context/GlobalContext';
import { RiTeamLine } from "react-icons/ri";
const Sidebar = ({ isOpen, toggleSidebar }) => {

      const{setTasksData,user}= useGlobalContext();

      const fetchTask=async (status)=>{
            const res=await getAllTasks()
            setTasksData(res.data);
           setTasksData(prev=>prev.filter(task=>task.status.toLowerCase().includes(status.toLowerCase())));
      }

     const status=['pending','in progress','completed','AllTasks']
  return (
    <div
      className={`fixed md:static top-0 left-0 md:z-0 z-100 md:h-auto h-[100vh] bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0  md:block w-64`}
    >
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={toggleSidebar} className="text-white">
          ✕
        </button>
      </div>
      <nav className="mt-10">
        <Link href="/UserDashboard"  className="flex items-center px-4 py-2 hover:bg-gray-700">
             <FaHome className="mr-3" /> Dashboard
        </Link>
       
       
        <Link href={`/UserDashboard/Tasks/${status[3]}`} className="flex items-center px-4 py-2 hover:bg-gray-700">
          <FaTasks className="mr-3" />All Tasks
        </Link>
         <Link href={`/UserDashboard/Tasks/${status[0]}`}  className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><MdOutlinePending className='mr-3 text-xl' /> Pending Tasks</Link>
          <Link href={`/UserDashboard/Tasks/${status[1]}`}  className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><RiProgress4Line  className='mr-3 text-xl' /> In Progress Tasks</Link>
         <Link href={`/UserDashboard/Tasks/${status[2]}`} className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><IoCloudDoneOutline className='mr-3 text-xl' /> Completed Tasks</Link>
        
        {user?.role==='admin' && <Link href="/UserDashboard/UserPage" className='flex  px-4 py-2 items-center cursor-pointer hover:bg-gray-700'><RiTeamLine className='mr-3 text-xl' />Team Members</Link>} 
       
      </nav>
    </div>
  );
};

export default Sidebar;
