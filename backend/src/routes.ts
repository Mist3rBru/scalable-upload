import { IncomingMessage, ServerResponse } from 'http'
import { Server } from 'socket.io'
import { UploadHandler } from './upload-handler'
import { logger, pipelineAsync } from './utils'

export class Routes {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly io: Server
  ) {}

  async post (req: IncomingMessage, res: ServerResponse) {
    const socketId = req.url.split(/socketId=/i).pop()
    const redirectTo = req.headers.origin
    const uploadHandler = new UploadHandler(this.io, socketId)

    req.headers = {
      'Content-Type': req.headers['content-type'],
      'content-type': req.headers['content-type']
    }

    const onFinish = (res: ServerResponse, redirectTo: string) => () => {
      res.writeHead(204, {
        Connection: 'close',
        Location: `${redirectTo}?msg=Files uploaded with success!`
      })

      res.end()
    }

    const busboyInstance = uploadHandler.registerEvents(
      req.headers,
      onFinish(res, redirectTo)
    )

    await pipelineAsync(
      req,
      busboyInstance
    )

    logger.info('Request finished with success!')
  }
}
