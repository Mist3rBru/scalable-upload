export function formatFileSize (bytes: number): string {
  if (!bytes) return '0B'
  const fileSizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(i)) + fileSizes[i]
  )
}
