import { formatFileSize } from '../helpers'

export function FilePreview ({ file } : { file: File }) {
  return (
    <li className="flex items-center justify-between p-2 border border-[#8257e6]">
      <div className="flex items-center">
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
