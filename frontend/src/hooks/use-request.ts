import { useCallback, useState } from 'react'
import { api } from '../services'

type FetchParams = {
  method: 'post' | 'put'
  uri: string
  body: FormData | Record<string, any>
}

export function useRequest (params: FetchParams) {
  const [status, setStatus] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const { method, uri, body } = params

  const request = useCallback(async () => {
    try {
      setIsFetching(true)
      const res = await api[method](uri, body)
      setStatus(res.status)
      setIsFetching(false)
    } catch (error: any) {
      setStatus(error.response.status)
      setIsFetching(false)
    }
  }, [body, uri])

  return { request, status, isFetching }
}
