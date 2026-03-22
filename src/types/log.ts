export interface S_CLOG {
  id: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'ARCHIVE' | 'RESTORE' | 'OTHER'
  timestamp: string
  userId: string
  recordId?: string
  details?: string
  archived?: boolean
  archiveBatchId?: string
  archiveDate?: string
}
