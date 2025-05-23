"use client"
import { useGlobalContext } from '@/app/Context/GlobalContext';
// import { useSocket } from '@/Hooks/SocketHook';
import React from 'react';
import { io } from 'socket.io-client';
import { useSocket } from '@/Hooks/SocketHook';
import { useState,useEffect } from 'react';
function Notification(props) {

    const{user}=useGlobalContext();
     const socket = useSocket(user._id);
  const [notifications, setNotifications] = useState([]);
    useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      setNotifications((prev) => [...prev, data]);
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);

  console.log(notifications)
    return (
       <div style={{ padding: 20 }}>
      <h1>Notifications</h1>
      <ul>
        {notifications?.map((n, i) => (
          <li key={i}>{n.message}</li>
        ))}
      </ul>
    </div>
    );
}

export default Notification;