onRecordCreate((e) => {
  e.record.set('C_FILI_PKID', e.record.id)
  e.next()
}, 'C_FILI')
