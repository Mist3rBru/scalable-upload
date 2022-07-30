import { useEffect, useReducer, useState } from 'react'

type UploadParams = {
  fileName: string
}

type FileReducer = (state: File[], files: File | File[]) => File[]

const fileReducer: FileReducer = (state, files) => {
  if (Array.isArray(files)) {
    return files
  } else {
    return [files]
  }
}

export function useUpload (params: UploadParams) {
  const [formData, setFormData] = useState(new FormData())
  const [files, setFiles] = useReducer<FileReducer>(fileReducer, [])

  useEffect(() => {
    const fd = new FormData()

    Array.from(files).forEach((file, index) => {
      fd.append(params.fileName + index, file)
    })

    setFormData(fd)
  }, [files])

  return { formData, files, setFiles }
}
