import { RequestListener, ServerResponse, IncomingMessage } from 'http'
import { Routes } from './routes'
import { io } from './app'

export const router: RequestListener = async (req, res) => {
  const defaultRoute = async (req: IncomingMessage, res: ServerResponse) => res.end('Hello!')

  const routes = new Routes(io)
  const chosen = routes[req.method.toLowerCase()] || defaultRoute

  return chosen.apply(routes, [req, res])
}
