"use client"

import React from 'react';
import styles from './UserPage.module.css'; // Importing the CSS module
import { useState,useEffect } from 'react';
import { getAllUsers } from '@/Api';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const UsersPage = () => {

  
// const users = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', tasks: ['Task 1', 'Task 2'] },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', tasks: ['Task 3'] },
//     { id: 3, name: 'Samuel Green', email: 'samuel@example.com', tasks: ['Task 4', 'Task 5', 'Task 6'] },
//     { id: 4, name: 'Emma White', email: 'emma@example.com', tasks: ['Task 7'] },
//     { id: 5, name: 'Michael Brown', email: 'michael@example.com', tasks: ['Task 8', 'Task 9'] },
//     { id: 6, name: 'Emily Black', email: 'emily@example.com', tasks: ['Task 10'] },
//     { id: 7, name: 'David Blue', email: 'david@example.com', tasks: ['Task 11', 'Task 12'] },
//     { id: 8, name: 'Olivia Gray', email: 'olivia@example.com', tasks: ['Task 13'] },
//     { id: 9, name: 'James Wilson', email: 'james@example.com', tasks: ['Task 14', 'Task 15'] },
//     { id: 10, name: 'Lily Clark', email: 'lily@example.com', tasks: ['Task 16'] },
//   ];

  const [searchQuery, setSearchQuery] = useState('');
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState({});
   const[users,setUsers]=useState([]);
     const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(()=>{
       const getUsers=async ()=>{
          const response=await getAllUsers();
          setUsers(response.data);
          setFilteredUsers(response.data);
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
