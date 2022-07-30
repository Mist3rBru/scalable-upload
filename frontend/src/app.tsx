import { FormEvent, useCallback } from 'react'
import { Dropzone, FilePreview } from './components'
import { useRequest, useSocket, useUpload } from './hooks'

export default function App () {
  const { data: sentBytes, socketId } = useSocket<number>(
    import.meta.env.VITE_UPLOAD_EVENT,
    0
  )

  const { formData, files, setFiles } = useUpload({
    fileName: 'file'
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

  return (
    <div className="min-h-screen w-screen py-16 flex items-center justify-center bg-gradient-to-bl from-[#09090a] to-[#121214] text-[#f0f0f0]">
      <form
        onSubmit={handleSubmit}
        className="relative w-11/12 max-w-sm m-auto bg-[#202025] p-4 rounded border-purple-500 border"
      >
        <Dropzone onDrop={setFiles} />
        <ul className="flex flex-col gap-3 my-4">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              isFetching={isFetching}
              sentBytes={sentBytes}
            />
          ))}
        </ul>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-8/12 m-auto p-2 bg-indigo-500 bg-opacity-75 rounded-sm"
        >
          {!isFetching ? 'Enviar' : 'Enviando...'}
        </button>
      </form>
    </div>
  )
}
