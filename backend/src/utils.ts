import pino from 'pino'
import { promisify } from 'util'
import { pipeline } from 'stream'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

const pipelineAsync = promisify(pipeline)

export {
  logger,
  pipelineAsync,
  promisify
}
