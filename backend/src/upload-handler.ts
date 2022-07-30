import { IncomingHttpHeaders } from 'http'
import { createWriteStream } from 'fs'
import { Server } from 'socket.io'
import { Readable } from 'stream'
import setupBusboy from 'busboy'

import { logger, pipelineAsync } from './utils'
import { resolve } from 'path'

export class UploadHandler {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly io: Server, private readonly socketId: string) {}

  registerEvents (headers: IncomingHttpHeaders, onFinish) {
    const busboy = setupBusboy({ headers })

    busboy.on('file', this.onFile.bind(this))

    busboy.on('finish', onFinish)

    return busboy
  }

  private handleFileBytes (filename: string) {
    let received = 0
    async function * handleData (data: any) {
      for await (const item of data) {
        received += item.length
        // logger.info(`File [${filename}] got ${size} bytes to ${this.socketId}`)
        this.io.to(this.socketId).emit('file-upload', received)
        yield item
      }
    }
    return handleData.bind(this)
  }

  private async onFile (fieldname: string, fileStream: Readable, file: any) {
    const saveFileTo = resolve(__dirname, '../downloads', file.filename)
    logger.info('Uploading: ' + saveFileTo)

    await pipelineAsync(
      fileStream,
      // eslint-disable-next-line no-useless-call
      this.handleFileBytes.apply(this, [file.filename]),
      createWriteStream(saveFileTo)
    )

    logger.info(`File [${file.filename}] finished!`)
  }
}
