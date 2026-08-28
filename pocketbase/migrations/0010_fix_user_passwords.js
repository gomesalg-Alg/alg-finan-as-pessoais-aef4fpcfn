migrate(
  (app) => {
    const cUser = app.findCollectionByNameOrId('C_USER')

    // Standard initial password that satisfies minimum PB requirements (min 8 chars)
    const defaultPassword = 'Skip@Pass'

    // List of emails to seed/update
    const usersToUpdate = [
      {
        email: 'admin@alg.com.br',
        name: 'André Luiz Gomes',
        perf: 'ADMIN',
        codi: 'ADM01',
        stat: 'ATIVO',
      },
      {
        email: 'andre@alg.com.br',
        name: 'André Luiz Gomes',
        perf: 'ADMIN',
        codi: 'ADM02',
        stat: 'ATIVO',
      },
      {
        email: 'gomesalg@gmail.com',
        name: 'André Luiz Gomes',
        perf: 'ADMIN',
        codi: 'ADM03',
        stat: 'ATIVO',
      },
    ]

    for (const u of usersToUpdate) {
      try {
        const record = app.findAuthRecordByEmail('C_USER', u.email)
        record.setPassword(defaultPassword)
        record.setVerified(true)
        if (!record.getString('name')) record.set('name', u.name)
        if (!record.getString('C_USER_NOME')) record.set('C_USER_NOME', u.name)
        if (!record.getString('C_USER_MAIL')) record.set('C_USER_MAIL', u.email)
        if (!record.getString('C_USER_PERF')) record.set('C_USER_PERF', u.perf)
        if (!record.getString('C_USER_CODI')) record.set('C_USER_CODI', u.codi)
        if (!record.getString('C_USER_STAT')) record.set('C_USER_STAT', u.stat)
        if (!record.getString('C_USER_PKID')) record.set('C_USER_PKID', record.id)
        app.save(record)
      } catch (_) {
        try {
          const record = new Record(cUser)
          record.setEmail(u.email)
          record.setPassword(defaultPassword)
          record.setVerified(true)
          record.set('name', u.name)
          record.set('C_USER_NOME', u.name)
          record.set('C_USER_MAIL', u.email)
          record.set('C_USER_PERF', u.perf)
          record.set('C_USER_CODI', u.codi)
          record.set('C_USER_STAT', u.stat)
          app.save(record)
          // Set PKID if needed
          record.set('C_USER_PKID', record.id)
          app.save(record)
        } catch (e) {
          console.log('Error creating user ' + u.email + ':', e)
        }
      }
    }
  },
  (app) => {
    // No revert needed
  },
)
