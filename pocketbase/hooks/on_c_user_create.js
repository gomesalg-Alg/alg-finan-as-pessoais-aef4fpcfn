onRecordCreate((e) => {
  e.record.set('C_USER_PKID', e.record.id)
  e.next()
}, 'C_USER')
