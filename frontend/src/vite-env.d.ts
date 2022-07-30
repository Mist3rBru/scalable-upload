/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_UPLOAD_EVENT: string
 // more env variables...
}

interface ImportMeta {
 readonly env: ImportMetaEnv
}
