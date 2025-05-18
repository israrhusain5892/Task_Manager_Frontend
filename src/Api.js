// Api call here
import axios from 'axios';

// const ROOT_URL="https://task-manager-backend-t9v7.onrender.com";

const ROOT_URL="http://localhost:4000";

let user;
if(typeof window!=='undefined'){
      user=JSON.parse(localStorage.getItem("user")) || undefined;
}


console.log(user)
// header for sending token
const authorize = {
    headers: { Authorization:`Bearer ${user?.token}` }
    }

    // get All Users
export const getAllUsers=async ()=>{
     return await axios.get(`${ROOT_URL}/api/auth/getAllUsers`,authorize)
}

export const getTasksByStatus=async (status)=>{
     return await axios.get(`${ROOT_URL}/api/tasks/status/get?status=${status}`,authorize);
}
export const getAllTasks = async () => {
    return await axios.get(`${ROOT_URL}/api/tasks/`, authorize);
}

// add task api to db
export const addTask=async (data)=>{
     return await axios.post(`${ROOT_URL}/api/tasks/`,data,authorize);
}
// update task
export const updateTask=async (data,id)=>{
    return await axios.put(`${ROOT_URL}/api/tasks/${id}`,data,authorize)
}
// delete Task
export const deleteTask=async (id)=>{
    return await axios.delete(`${ROOT_URL}/api/tasks/${id}`,authorize)
}

// register user
export const register=async (data)=>{
    return await axios.post(`${ROOT_URL}/api/auth/register`,data);
}
// login api
export const loginUser=async (data)=>{
    return await axios.post(`${ROOT_URL}/api/auth/login`,data);
}


// Task Activity api 

export const getAllActivities=async ()=>{
    return await axios.get(`${ROOT_URL}/api/activities`,authorize);
}