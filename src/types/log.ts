export interface S_CLOG {
  id: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  timestamp: string
  userId: string
  recordId: string
  details?: string
}
