import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Dropzone, FilePreview } from './components'
import { formatFileSize } from './helpers'
import { useRequest, useSocket, useUpload } from './hooks'

export default function App () {
  const [remainingBytes, setRemainingBytes] = useState(0)
  const [sentPercent, setSentPercent] = useState(0)
  const { data: sentBytes, socketId } = useSocket<number>(
    import.meta.env.VITE_UPLOAD_EVENT,
    0
  )

  const { formData, files, setFiles } = useUpload({
    fileName: 'files'
  })

  const { isFetching, request } = useRequest({
    uri: '/upload?socketId=' + socketId,
    method: 'post',
    body: formData
  })

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      request()
    },
    [request]
  )

  const totalBytes = useMemo((): number => (
    Array(files).flat().reduce((size, file) => size + file.size, 0)
  ), [files.length])

  useEffect(() => {
    setRemainingBytes(totalBytes - sentBytes)
    setSentPercent((sentBytes / totalBytes) * 100)
  }, [sentBytes])

  useEffect(() => {
    setRemainingBytes(totalBytes)
    setSentPercent(0)
  }, [files])

  return (
    <div className="min-h-screen w-screen py-16 flex items-center justify-center bg-gradient-to-bl from-[#09090a] to-[#121214] text-[#f0f0f0]">
      <form
        onSubmit={handleSubmit}
        className="relative w-11/12 max-w-md m-auto bg-[#202025] p-4 rounded border-purple-500 border"
      >
        <Dropzone onDrop={setFiles} />
        <ul className="flex flex-col gap-3 my-4 max-h-80 overflow-y-auto">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
            />
          ))}
        </ul>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-8/12 m-auto p-2 bg-indigo-500 bg-opacity-75 rounded-sm"
        >
          {!isFetching ? 'Enviar' : 'Enviando...'}
        {isFetching && (
          <CircularProgressbar
            value={sentPercent}
            strokeWidth={14}
            styles={{
              root: { width: 14 },
              path: { stroke: '#f00' }
            }}
          />
        )}
        </button>
        <span className="absolute bottom-1 right-1 text-xs">
          {formatFileSize(remainingBytes)}
        </span>
      </form>
    </div>
  )
}
