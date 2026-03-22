export const logger = {
  log: (action: string, data: any) => {
    console.log(`[S_CLOG] Audit Log -> Action: ${action}`, data)
  },
}
