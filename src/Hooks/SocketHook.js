// lib/useSocket.js
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

let socket;

export const useSocket = (userId) => {
  const socketRef = useRef();

  useEffect(() => {
    if (!userId) return;

    // Avoid multiple socket connections
    if (!socket) {
      socket = io("https://task-manager-backend-t9v7.onrender.com", {
        withCredentials: true,
        transports: ['websocket'], // ensure websocket connection
      });
    }

    socket.emit('joinRoom', userId);
    socketRef.current = socket;

    return () => {
      socket.emit('leaveRoom', userId);
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
};
