import {useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';

const params = {
  url: 'http://localhost:3000'
}

export const  App = () => {
  const [name, setName] = useState('')
  const { connect, disconnect ,subscribe } = useSocket(params);

  const joinRoom = async () => {
    subscribe('login', name)
  }

  useEffect(() => {
    connect();

    return () => disconnect()
  }, []);

  return (
    <>
      <h1>
        Enter your name
      </h1>
      <input type='text' placeholder='name' onChange={(e) =>setName(e.target.value)}/>
      <button onClick={joinRoom}>Join room</button>
    </>
  )
}