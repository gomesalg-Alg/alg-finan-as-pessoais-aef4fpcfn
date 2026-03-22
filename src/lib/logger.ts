import { S_CLOG } from '@/types/log'

// Mock "table" for S_CLOG
export const S_CLOG_TABLE: S_CLOG[] = []

export const addAuditLog = (
  action: S_CLOG['action'],
  recordId: string,
  userId: string = 'CURRENT_USER',
  details?: string,
) => {
  const log: S_CLOG = {
    id: Date.now().toString() + Math.random().toString(36).substring(2),
    action,
    timestamp: new Date().toISOString(),
    userId,
    recordId,
    details,
  }

  S_CLOG_TABLE.push(log)

  // Console log to simulate recording the audit trace
  console.info('[Audit Log] S_CLOG Entry:', log)
}
