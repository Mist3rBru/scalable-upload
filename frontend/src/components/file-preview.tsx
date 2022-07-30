import { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { formatFileSize } from '../helpers'

interface FilePreviewProps {
  file: File
  sentBytes: number
  isFetching: boolean
}

export function FilePreview (props: FilePreviewProps) {
  const [remainingBytes, setRemainingBytes] = useState(0)
  const [sentPercent, setSentPercent] = useState(0)
  const { file, sentBytes, isFetching } = props

  useEffect(() => {
    setRemainingBytes(file.size - sentBytes)
    setSentPercent((sentBytes / file.size) * 100)
  }, [sentBytes])

  useEffect(() => {
    setRemainingBytes(file.size)
    setSentPercent(0)
  }, [file])

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
        {formatFileSize(remainingBytes)}
      </span>
    </li>
  )
}
