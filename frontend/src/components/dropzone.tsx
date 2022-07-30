import { Dispatch, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onDrop: Dispatch<File[]>
}

export function Dropzone (props: DropzoneProps) {
  const [borderColor, setBorderColor] = useState('')
  const [text, setText] = useState('')

  const dropzone = useDropzone({
    onDropAccepted: file => props.onDrop(file)
  })

  useEffect(() => {
    if (!dropzone.isDragActive) {
      if (dropzone.acceptedFiles.length) {
        setBorderColor('border-sky-600')
        setText(
          dropzone.acceptedFiles.length > 1
            ? 'Arquivos carregados'
            : 'Arquivo carregado'
        )
      } else {
        setBorderColor('border-zinc-300')
        setText('Arraste arquivos aqui...')
      }
    } else if (dropzone.isDragReject) {
      setBorderColor('border-red-500')
      setText('Arquivo não suportado')
    } else {
      setBorderColor('border-green-500')
      setText('Solte aqui...')
    }
  }, [dropzone.isDragActive, dropzone.acceptedFiles])

  return (
    <div
      {...dropzone.getRootProps()}
      className={`border-2 border-dashed ${borderColor} cursor-pointer`}
    >
      <input {...dropzone.getInputProps()} className="bg-transparent w-full" />
      <p className="p-4 text-center">{text}</p>
    </div>
  )
}
