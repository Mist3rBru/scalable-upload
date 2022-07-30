import http from 'http'
import websocket from 'socket.io'
import { router } from './router'

const app = http.createServer(router)

const io = new websocket.Server(app, {
  cors: {
    origin: '*',
    credentials: false
  }
})

export { app, io }
