export interface UseRequestApiOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: any
  lazy?: boolean
}
