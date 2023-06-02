import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState('')

  const joinRoom = () => {
    socket.emit('join_room', username)
    console.log(`User ${username} joined` )
  }

  useEffect(() => {
    socket.on("connection", () => {
     setIsConnected(true);
    });

    return () => {
     socket.off("connection");
    };
  }, []);

  return (
    <div className="App">
      <h1>Enter your name</h1>
      <input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
};
