migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'gomesalg@gmail.com')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('gomesalg@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
      app.save(record)
    }

    try {
      app.findFirstRecordByData('empresas', 'C_EMPR_CODI', 'EMP01')
    } catch (_) {
      const col = app.findCollectionByNameOrId('empresas')
      const record = new Record(col)
      record.set('C_EMPR_CODI', 'EMP01')
      record.set('C_EMPR_NOME', 'ALG Finanças S.A.')
      record.set('C_EMPR_FANT', 'ALG Finanças')
      record.set('C_EMPR_CNPJ', '12345678000199')
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'gomesalg@gmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
