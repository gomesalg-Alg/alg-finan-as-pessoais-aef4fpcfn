onRecordCreate((e) => {
  e.record.set('C_EMPR_PKID', e.record.id)
  e.next()
}, 'C_EMPR')
