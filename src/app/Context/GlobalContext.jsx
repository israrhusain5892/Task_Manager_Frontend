"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAllUsers} from '../../Api';
// Create context
const GlobalContext = createContext();

// Create provider
export const GlobalProvider = ({ children }) => {

  let user;
if(typeof window!=='undefined'){
      user=JSON.parse(localStorage.getItem("user")) || undefined;
}
      
  //  this is for setting up task object 
  const [taskObject, setTaskObject] = useState({});
  
  
   const[users,setUsers]=useState([]);
  // get all users
     useEffect(()=>{
      const getUsers=async ()=>{

          const res=await getAllUsers();
          setUsers(res.data);
      }
      getUsers();
     },[])
  
  // doing state lifting
  const[tasksData,setTasksData]=useState([]);
  



  return (
    <GlobalContext.Provider
      value={{
        user,taskObject, setTaskObject,tasksData,setTasksData,users ,setUsers
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier usage
export const useGlobalContext = () => useContext(GlobalContext);
