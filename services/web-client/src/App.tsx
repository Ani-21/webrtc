import {useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const  App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
      socket.on('connection', () => {
        setIsConnected(true)
      })

      return () => {
        socket.off('connection')
      }
  }, [])

  return (
    <h1>
      Hello world
      <p>{isConnected}</p>
    </h1>
  )
}