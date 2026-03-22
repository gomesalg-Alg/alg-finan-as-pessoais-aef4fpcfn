export const logger = {
  log: (action: string, data: any) => {
    console.log(`[S_CLOG] Audit Log -> Action: ${action}`, data)
  },
}

export const addAuditLog = (action: string, details?: any) => {
  console.log(`[AUDIT_LOG] Action: ${action}`, details || '')
}
