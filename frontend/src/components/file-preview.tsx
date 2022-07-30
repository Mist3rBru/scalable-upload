import { formatFileSize } from '../helpers'

export function FilePreview ({ file }: { file: File }) {
  const imageExtensions = ['png', 'jpg', 'jpeg']
  const fileExtension = file.name.split('.')[1]
  const isImage = imageExtensions.includes(fileExtension)

  return (
    <li className="flex items-center justify-between p-2 border border-zinc-600">
      <div className="flex items-center">
        {isImage && (
          <img
            src={URL.createObjectURL(file)}
            alt="Imagem do arquivo"
            className="object-cover h-12"
          />
        )}
        <p
          style={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '1',
            wordBreak: 'break-word',
            padding: '0 8px'
          }}
        >
          {file.name}
        </p>
      </div>
      <span className="flex items-center gap-3 text-xs">
        {formatFileSize(file.size)}
      </span>
    </li>
  )
}
