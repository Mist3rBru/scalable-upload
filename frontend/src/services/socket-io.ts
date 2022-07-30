import socketIo from 'socket.io-client'
const API_URL = 'http://localhost:3030'

export const socket = socketIo(API_URL, {
  autoConnect: true,
  host: import.meta.env.VITE_API_URL,
  withCredentials: false
})
