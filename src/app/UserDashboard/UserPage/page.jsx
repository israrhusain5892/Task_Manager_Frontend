"use client"

import React from 'react';
import styles from './UserPage.module.css'; // Importing the CSS module
import { useState,useEffect } from 'react';
import { getAllUsers } from '@/Api';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loader from '@/components/Loader';
const UsersPage = () => {

  

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading,setLoading]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState({});
   const[users,setUsers]=useState([]);
     const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(()=>{
       const getUsers=async ()=>{
           setLoading(true)
          const response=await getAllUsers();
          if(response.status===201 || response.status===200){
                setLoading(false)
                setUsers(response.data);
                setFilteredUsers(response.data);
          }
          
       }
       getUsers();
  },[])
    console.log(users[0]?.user)
   
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    console.log(currentUsers)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleToggleTasks = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Editing user ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting user ${id}`);
  };

  return (
    <div className={`h-[100vh] ${styles.usersPage}`}>
      <h1 className={styles.list}>Team Members</h1>
      
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableWrapper}>
       {isLoading && <Loader/>} 
        <table className={styles.responsiveTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Tasks Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user,index) => (
             
              <tr key={user._id}>
                
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={styles.toggleButton}
                    onClick={() => handleToggleTasks(user._id)}
                  >
                    {expandedRows[user._id] ? 'Hide Tasks' : 'View Tasks'}
                  </button>
                  {expandedRows[user._id] && (
                    <ul className={styles.taskList}>
                      {user.tasks?.map((task, index) => (
                        <li key={index}>{task.title}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="flex gap-2 items-center justify-center">
                  <div className='bg-white cursor-pointer  hover:text-gray-800' onClick={() => handleEdit(user._id)}><MdModeEdit className='text-2xl text-blue-600  hover:text-gray-800' /> </div>
                  <div className='bg-white cursor-pointer hover:text-gray-800' onClick={() => handleDelete(user._id)}> <MdDelete className='text-2xl text-red-600  hover:text-gray-800' /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
