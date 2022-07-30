import { useState } from 'react'
import { socket } from '../services/socket-io'

export function useSocket<T> (event: string, initial: T) {
  const [data, setData] = useState<T>(initial)
  socket.on(event, data => setData(data))
  return { data, socketId: socket.id }
}
