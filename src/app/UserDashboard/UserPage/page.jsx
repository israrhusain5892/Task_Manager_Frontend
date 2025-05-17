"use client"

import React from 'react';
import styles from './UserPage.module.css'; // Importing the CSS module
import { useState } from 'react';
const UsersPage = () => {
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', tasks: ['Task 1', 'Task 2'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tasks: ['Task 3'] },
    { id: 3, name: 'Samuel Green', email: 'samuel@example.com', tasks: ['Task 4', 'Task 5', 'Task 6'] },
    { id: 4, name: 'Emma White', email: 'emma@example.com', tasks: ['Task 7'] },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', tasks: ['Task 8', 'Task 9'] },
    { id: 6, name: 'Emily Black', email: 'emily@example.com', tasks: ['Task 10'] },
    { id: 7, name: 'David Blue', email: 'david@example.com', tasks: ['Task 11', 'Task 12'] },
    { id: 8, name: 'Olivia Gray', email: 'olivia@example.com', tasks: ['Task 13'] },
    { id: 9, name: 'James Wilson', email: 'james@example.com', tasks: ['Task 14', 'Task 15'] },
    { id: 10, name: 'Lily Clark', email: 'lily@example.com', tasks: ['Task 16'] },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState({});

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
    <div className={styles.usersPage}>
      <h1>User List</h1>

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
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={styles.toggleButton}
                    onClick={() => handleToggleTasks(user.id)}
                  >
                    {expandedRows[user.id] ? 'Hide Tasks' : 'View Tasks'}
                  </button>
                  {expandedRows[user.id] && (
                    <ul className={styles.taskList}>
                      {user.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
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
